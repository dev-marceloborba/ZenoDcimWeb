import { AlarmTotalizerStatisticsModel } from "modules/automation/models/alam-totalizer-statistics.model";
import { AlarmGroupStatistics } from "modules/automation/models/alarm-group-statistics.model";
import {
  AlarmModel,
  AlarmTableViewModel,
  EAlarmStatus,
} from "modules/automation/models/alarm-model";
import { RealtimeModel } from "modules/automation/models/realtime-model";
import { TagModel } from "modules/automation/models/tag.model";
import splitPathnameIntoFields from "modules/utils/helpers/splitPathnameIntoFields";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";
import AutomationRealtimeContext from "../contexts/automationRealtimeContext";
import { RealtimeStatus } from "../types/automationRealtime";

const data = new Map<string, TagModel>();
const siteStatistics = new Map<string, AlarmGroupStatistics>();
const buildingStatistics = new Map<string, AlarmGroupStatistics>();
const roomStatistics = new Map<string, AlarmTotalizerStatisticsModel>();
const equipmentStatistics = new Map<string, AlarmTotalizerStatisticsModel>();
const alarmData = new Map();

let keepAliveValue = 0;
let lastKeepAliveValue = 0;

const AutomationRealtimeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState({
    data: new Map<string, TagModel>(),
  });
  const [alarms, setAlarms] = useState<AlarmTableViewModel[]>([]);
  const [siteAlarmStatistics, setSiteAlarmStatistics] = useState({
    data: new Map<string, AlarmGroupStatistics>(),
  });
  const [buildingAlarmStatistics, setBuildingAlarmStatistics] = useState({
    data: new Map<string, AlarmGroupStatistics>(),
  });
  const [roomAlarmStatistics, setRoomAlarmStatistics] = useState({
    data: new Map<string, AlarmTotalizerStatisticsModel>(),
  });
  const [equipmentAlarmStatistics, setEquipmentAlarmStatistics] = useState({
    data: new Map<string, AlarmTotalizerStatisticsModel>(),
  });

  const { message: keepAlive } = useSubscription("/keep-alive");
  const { message: topLevel } = useSubscription("/runtime");
  const { client } = useMqttState();
  const [serviceStatus, setServiceStatus] =
    useState<RealtimeStatus>("connected");

  const getRealtimeValue = (key: string) => state.data.get(key)?.value ?? 0;

  const getTag = (key: string): TagModel =>
    state.data.get(key) ?? { value: 0, unit: "", timestamp: null };

  const getRealtimeAlarm = (key: string) => alarmData.get(key) as AlarmModel;

  const getSiteStatistics = (key: string) => siteAlarmStatistics.data.get(key)!;

  const getBuildingStatistics = (key: string) =>
    buildingAlarmStatistics.data.get(key)!;

  const getRoomStatistics = (key: string) => roomAlarmStatistics.data.get(key)!;

  const getEquipmentStatistics = (key: string) =>
    equipmentAlarmStatistics.data.get(key)!;

  const getRealtimeStatus = (status: string | Error): RealtimeStatus => {
    switch (status) {
      case "Offline":
        return "offline";
      case "Connecting":
        return "loading";
      case "Connected":
        return "connected";
      default:
        return "offline";
    }
  };

  const publish = (topic: string, data: string) => {
    client?.publish(topic, data, {
      retain: false,
    });
  };

  useEffect(() => {
    if (topLevel) {
      if (topLevel?.message) {
        const payload = topLevel.message.toString();
        const obj = JSON.parse(payload) as RealtimeModel;
        const alarmTemp: AlarmTableViewModel[] = [];
        obj.forEach((site) => {
          siteStatistics.set(site.name, {
            totalAlarmsByClimate: site.totalAlarmsByClimate,
            totalAlarmsByEnergy: site.totalAlarmsByEnergy,
            totalAlarmsByTelecom: site.totalAlarmsByTelecom,
          });
          site.buildings.forEach((building) => {
            buildingStatistics.set(building.name, {
              totalAlarmsByClimate: building.totalAlarmsByClimate,
              totalAlarmsByEnergy: building.totalAlarmsByEnergy,
              totalAlarmsByTelecom: building.totalAlarmsByTelecom,
            });
            building.floors.forEach((floor) => {
              floor.rooms.forEach((room) => {
                roomStatistics.set(room.name, {
                  totalAlarms: room.totalAlarms,
                });
                room.equipments.forEach((equipment) => {
                  equipmentStatistics.set(equipment.name, {
                    totalAlarms: equipment.totalAlarms,
                  });
                  equipment.parameters.forEach((parameter) => {
                    data.set(parameter.name, {
                      value: parameter.value,
                      timestamp: parameter.timestamp,
                      unit: parameter.unit,
                    });
                    let alarmsInTag: any[] = [];
                    parameter.alarms.forEach((alarm) => {
                      if (
                        alarm.status === EAlarmStatus.ACKED ||
                        alarm.status === EAlarmStatus.ACTIVE
                      ) {
                        alarmsInTag.push(alarm);
                        const ds = splitPathnameIntoFields(alarm.pathname);
                        alarmTemp.push({
                          id: alarm.id,
                          acked: false,
                          site: ds.site,
                          building: ds.building,
                          equipment: ds.equipment,
                          floor: ds.floor,
                          inDate: alarm.inDate,
                          outDate: alarm.outDate,
                          recognizedDate: alarm.recognizedDate,
                          parameter: ds.parameter,
                          parameterId: "",
                          room: ds.room,
                          rule: ds.alarm ?? "",
                          ruleId: alarm.ruleId,
                          status: alarm.status,
                          value: alarm.value,
                          priority: alarm.priority,
                          type: alarm.type,
                          operator: alarm.operator,
                        });
                      }
                    });
                    data.set(parameter.name, {
                      value: parameter.value,
                      timestamp: parameter.timestamp,
                      unit: parameter.unit,
                      alarms: alarmsInTag,
                    });
                  });
                });
              });
            });
          });
        });
        setState({ data });
        setSiteAlarmStatistics({ data: siteStatistics });
        setBuildingAlarmStatistics({ data: buildingStatistics });
        setRoomAlarmStatistics({ data: roomStatistics });
        setEquipmentAlarmStatistics({ data: equipmentStatistics });
        setAlarms(alarmTemp);
      }
    }
  }, [topLevel]);

  // keep alive
  useEffect(() => {
    if (keepAlive) {
      if (keepAlive.message) {
        keepAliveValue = Number(keepAlive.message);
      }
    }
  }, [keepAlive]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastKeepAliveValue === keepAliveValue) {
        // console.log("offline!");
        setServiceStatus("offline");
      } else {
        // console.log("online");
        setServiceStatus("connected");
      }
      lastKeepAliveValue = keepAliveValue;
    }, 1000 * 60 * 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <AutomationRealtimeContext.Provider
      value={{
        getRealtimeValue,
        getTag,
        getSiteStatistics,
        getBuildingStatistics,
        getRoomStatistics,
        getEquipmentStatistics,
        alarms,
        activeAlarms: alarms.filter((x) => x.status === EAlarmStatus.ACTIVE)
          .length,
        publish,
        // status: getRealtimeStatus(connectionStatus),
        status: serviceStatus,
        getRealtimeAlarm,
      }}
    >
      {children}
    </AutomationRealtimeContext.Provider>
  );
};

export default AutomationRealtimeProvider;

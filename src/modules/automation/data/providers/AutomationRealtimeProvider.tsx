import {
  AlarmTableViewModel,
  EAlarmStatus,
} from "modules/automation/models/alarm-model";
import splitPathnameIntoFields from "modules/utils/helpers/splitPathnameIntoFields";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";
import AutomationRealtimeContext from "../contexts/automationRealtimeContext";
import { RealtimeStatus } from "../types/automationRealtime";

const data = new Map();

// const getValues = () => Array.from(data, ([_, value]) => value);

function convertMessageToArrayOfTags(obj: any) {
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  let output = [];

  for (let i = 0; i < keys.length; i++) {
    output.push({
      name: keys[i]
        .replaceAll("*", "")
        .replaceAll("_", "")
        .replaceAll(/\s/g, ""),
      value: values[i],
    });
  }
  return output;
}

const AutomationRealtimeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState({
    data: new Map(),
  });
  const [alarms, setAlarms] = useState<AlarmTableViewModel[]>([]);
  const { message: realtimeTags } = useSubscription("/tags");
  const { message: realtimeAlarms, connectionStatus } =
    useSubscription("/current-alarms");
  const { client } = useMqttState();

  const getRealtimeValue = (key: string) => state.data.get(key)?.value ?? 0;

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
    if (realtimeTags) {
      if (realtimeTags?.message) {
        const payload = realtimeTags.message.toString();
        const obj = JSON.parse(payload);
        const values = convertMessageToArrayOfTags(obj);
        values.forEach((value: any) => {
          data.set(value.name, value);
        });
        setState({ data });
      }
    }
  }, [realtimeTags]);

  useEffect(() => {
    if (realtimeAlarms) {
      if (realtimeAlarms?.message) {
        const payload = realtimeAlarms.message.toString();
        const obj = JSON.parse(payload);
        setAlarms(
          obj.map((alarm: any, index: number) => {
            const ds = splitPathnameIntoFields(alarm.pathname);
            return {
              id: alarm.id,
              acked: false,
              building: ds.building,
              equipment: ds.equipment,
              floor: ds.floor,
              inDate: alarm.inDate,
              outDate: alarm.outDate,
              recognizedDate: alarm.recognizedDate,
              parameter: ds.parameter,
              parameterId: "",
              room: ds.room,
              rule: alarm.name,
              ruleId: alarm.ruleId,
              status: alarm.status,
              value: alarm.value,
            };
          })
        );
      }
    }
  }, [realtimeAlarms]);

  return (
    <AutomationRealtimeContext.Provider
      value={{
        getRealtimeValue: getRealtimeValue,
        alarms,
        activeAlarms: alarms.filter((x) => x.status === EAlarmStatus.ACTIVE)
          .length,
        publish,
        status: getRealtimeStatus(connectionStatus),
      }}
    >
      {children}
    </AutomationRealtimeContext.Provider>
  );
};

export default AutomationRealtimeProvider;

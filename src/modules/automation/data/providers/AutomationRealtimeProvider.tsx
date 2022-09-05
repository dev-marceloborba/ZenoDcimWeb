import { AlarmTableViewModel } from "modules/automation/models/alarm-model";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import { useEffect, useState } from "react";
import AutomationRealtimeContext from "../contexts/automationRealtimeContext";

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
  const { message: realtimeAlarms } = useSubscription("/current-alarms");
  const { client } = useMqttState();

  const getRealtimeValue = (key: string) => state.data.get(key)?.value ?? 0;

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
          obj.map((alarm: any, index: number) => ({
            id: alarm.id,
            acked: false,
            building: "Data Hall 1",
            equipment: "Disjuntor 1",
            floor: "Andar 1",
            inDate: alarm.inDate,
            outDate: alarm.outDate,
            parameter: index === 0 ? "Corrente" : "Tensão",
            parameterId: "",
            room: "Transformador A",
            rule: alarm.name,
            ruleId: alarm.ruleId,
            status: alarm.status,
            value: alarm.value,
          }))
        );
      }
    }
  }, [realtimeAlarms]);

  return (
    <AutomationRealtimeContext.Provider
      value={{
        getRealtimeValue: getRealtimeValue,
        alarms,
        isLoading: state.data.size === 0,
        publish,
      }}
    >
      {children}
    </AutomationRealtimeContext.Provider>
  );
};

export default AutomationRealtimeProvider;

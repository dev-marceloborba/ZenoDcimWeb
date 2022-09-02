import { useSubscription } from "mqtt-react-hooks";
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
  const { message } = useSubscription("/tags");

  const getRealtimeValue = (key: string) => state.data.get(key)?.value ?? 0;

  useEffect(() => {
    if (message) {
      if (message?.message) {
        const payload = message.message.toString();
        const obj = JSON.parse(payload);
        const values = convertMessageToArrayOfTags(obj);
        values.forEach((value: any) => {
          data.set(value.name, value);
        });
        setState({ data });
      }
    }
  }, [message]);

  return (
    <AutomationRealtimeContext.Provider
      value={{
        getRealtimeValue: getRealtimeValue,
        isLoading: state.data.size === 0,
      }}
    >
      {children}
    </AutomationRealtimeContext.Provider>
  );
};

export default AutomationRealtimeProvider;

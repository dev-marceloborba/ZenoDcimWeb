const environment =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const brokerUrl = `wss://${process.env.REACT_APP_BROKER_URL}`;
const mqttConfig = {
  clientId: "zenoWebClient-" + new Date().getTime(),
  clean: true,
  port: Number(process.env.REACT_APP_MQTT_PORT) ?? 8883,
  username: process.env.REACT_APP_MQTT_USERNAME ?? "",
  password: process.env.REACT_APP_MQTT_PASSWORD ?? "",
  protocol: "wss",
  connectTimeout: 1000 * 2,
};

export const signalrUrl = process.env.REACT_APP_SIGNALR_SERVER ?? "";

export default environment;

export { brokerUrl, mqttConfig };

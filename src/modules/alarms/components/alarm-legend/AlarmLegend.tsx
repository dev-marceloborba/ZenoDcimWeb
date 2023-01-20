import AlarmIndicator from "../alarm-indicator/AlarmIndicator";

const AlarmLegend: React.FC = () => {
  return (
    <>
      <AlarmIndicator status="highSeverity" description="Severidade alta" />
      <AlarmIndicator status="mediumSeverity" description="Severidade média" />
      <AlarmIndicator status="lowSeverity" description="Severidade baixa" />
    </>
  );
};

export default AlarmLegend;

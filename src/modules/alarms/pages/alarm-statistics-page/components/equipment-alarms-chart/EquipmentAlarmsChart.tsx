import BarChart from "modules/dashboards/components/bar-chart/Barchart";
import Card from "@mui/material/Card";

type EquipmentAlarmsChartProps = {
  equipments: string[];
  values: number[];
};

const EquipmentAlarmsChart: React.FC<EquipmentAlarmsChartProps> = ({
  equipments,
  values,
}) => {
  return (
    // <div style={{ maxWidth: "1000px" }}>
    <Card>
      <BarChart
        x={equipments}
        y={values}
        title="Alarmes por equipamento"
        horizontal
      />
    </Card>
    // </div>
  );
};

export default EquipmentAlarmsChart;

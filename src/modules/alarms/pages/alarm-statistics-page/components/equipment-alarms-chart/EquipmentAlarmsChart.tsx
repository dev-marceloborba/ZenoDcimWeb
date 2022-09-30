import BarChart from "modules/dashboards/components/bar-chart/Barchart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

type EquipmentAlarmsChartProps = {
  equipments: string[];
  values: number[];
};

const EquipmentAlarmsChart: React.FC<EquipmentAlarmsChartProps> = ({
  equipments,
  values,
}) => {
  return (
    <Card>
      <CardHeader title="Alarmes por equipamento" />
      <CardContent>
        <BarChart
          x={equipments}
          y={values}
          title="Alarmes por equipamento"
          horizontal
        />
      </CardContent>
    </Card>
  );
};

export default EquipmentAlarmsChart;

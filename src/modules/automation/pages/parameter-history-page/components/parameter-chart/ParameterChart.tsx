import { MeasuresHistoryModel } from "modules/automation/models/measure-history-model";
import LineChart from "modules/dashboards/components/line-chart/Linechart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import getTimeStampFormat from "modules/utils/helpers/timestampFormat";

type ParameterChartProps = {
  measures: MeasuresHistoryModel;
  description: string;
};

const ParameterChart: React.FC<ParameterChartProps> = ({
  measures,
  description,
}) => {
  const formatter = (value: number) => value.toFixed(2);
  return (
    <Card>
      <CardContent>
        <LineChart
          x={measures.map((measure) => getTimeStampFormat(measure.timestamp))}
          y={measures.map((measure) => measure.value)}
          description={description}
          formatter={formatter}
        />
      </CardContent>
    </Card>
  );
};

export default ParameterChart;

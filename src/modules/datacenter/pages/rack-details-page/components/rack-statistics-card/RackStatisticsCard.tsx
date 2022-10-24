import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type RackStatisticsCardProps = {
  title: string;
  value?: number;
  unit?: string;
} & CardProps;

const RackStatisticsCard: React.FC<RackStatisticsCardProps> = ({
  title,
  value = 0,
  unit,
  ...props
}) => {
  return (
    <Card {...props} sx={{ minWidth: "450px" }}>
      <CardHeader title={title} />
      <CardContent>
        <Stack direction="row">
          <Typography>{unit ? `${value} ${unit}` : value}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RackStatisticsCard;

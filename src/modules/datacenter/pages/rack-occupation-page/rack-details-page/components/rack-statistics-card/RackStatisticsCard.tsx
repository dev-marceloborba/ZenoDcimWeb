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
    <Card {...props}>
      <CardHeader
        title={title}
        sx={{
          paddingTop: 0.8,
          paddingBottom: 0.8,
          " & .MuiCardHeader-content > .MuiTypography-root": {
            fontSize: "18px",
          },
        }}
      />
      <CardContent
        sx={{
          "& :last-child": {
            paddingBottom: 0.4,
          },
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            fontSize: "26px",
          }}
        >
          {unit ? `${value} ${unit}` : value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RackStatisticsCard;

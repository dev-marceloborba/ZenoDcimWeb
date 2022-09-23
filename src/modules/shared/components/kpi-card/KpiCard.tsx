import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Row from "../Row";

type KpiCardProps = {
  value: number;
  unit?: string;
  title: string;
  icon?: any;
};

const KpiCard: React.FC<KpiCardProps> = ({ value, title, icon, unit }) => {
  return (
    <Card sx={{ minWidth: "380px" }}>
      <CardHeader title={title} />
      <CardContent>
        <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">{value}</Typography>
          <Typography>{unit}</Typography>
        </Row>
      </CardContent>
    </Card>
  );
};

export default KpiCard;

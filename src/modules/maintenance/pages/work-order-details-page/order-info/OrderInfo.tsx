import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type OrderInfoProps = {
  name: string;
  description: string;
};

const OrderInfo: React.FC<OrderInfoProps> = ({ name, description }) => {
  return (
    <Grid container p={1}>
      <Grid item md={4}>
        <Typography variant="subtitle1">{name}</Typography>
      </Grid>
      <Grid item md={8}>
        <Typography variant="body2">{description}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderInfo;

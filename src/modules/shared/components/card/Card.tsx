import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";

type CardProps = {
  showActions: boolean;
} & MuiCardProps;

const Card: React.FC<CardProps> = ({
  children,
  showActions = false,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      <CardHeader />
      <CardContent>{children}</CardContent>
      {/* {showActions} */}
    </MuiCard>
  );
};

export default Card;

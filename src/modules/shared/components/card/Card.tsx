import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

type CardProps = {
  showActions?: boolean;
  subheader?: string;
  handleHeaderClick?(): void;
} & MuiCardProps;

const Card: React.FC<CardProps> = ({
  children,
  showActions = false,
  title,
  subheader = "",
  handleHeaderClick,
  ...props
}) => {
  return (
    <MuiCard {...props} sx={{ position: "relative" }}>
      {/* <CardHeader
        title={title}
        subheader={subheader}
        onClick={() => {
          if (handleHeaderClick) handleHeaderClick();
        }}
        sx={
          handleHeaderClick && {
            cursor: "pointer",
          }
        }
      /> */}
      <Typography
        variant="h5"
        onClick={handleHeaderClick}
        sx={{
          cursor: "pointer",
          mt: 1,
          ml: 2,
        }}
      >
        {title}
      </Typography>
      <CardContent>{children}</CardContent>
      {/* {showActions} */}
    </MuiCard>
  );
};

export default Card;

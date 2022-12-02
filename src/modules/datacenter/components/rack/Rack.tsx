import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type RackProps = {
  name: string;
};

const Rack: React.FC<RackProps> = ({ name, ...props }) => {
  return (
    <Paper>
      <Typography>{name}</Typography>
    </Paper>
  );
};

export default Rack;

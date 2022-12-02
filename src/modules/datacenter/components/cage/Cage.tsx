import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RackModel } from "modules/datacenter/models/rack.model";
import Rack from "../rack/Rack";

type CageProps = {
  name: string;
  racks: RackModel[];
};

const Cage: React.FC<CageProps> = ({ name, racks, ...props }) => {
  return (
    <Paper>
      <Typography>{name}</Typography>
      <div>
        {racks.map((rack, idx) => (
          <Rack key={idx} name={`Rack ${idx}`} />
        ))}
      </div>
    </Paper>
  );
};

export default Cage;

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

type ColumnOptionsListProps = {
  items: string[];
};

const ColumnOptionsList: React.FC<ColumnOptionsListProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <MenuItem>{item}</MenuItem>
      ))}
    </>
  );
};

export default ColumnOptionsList;

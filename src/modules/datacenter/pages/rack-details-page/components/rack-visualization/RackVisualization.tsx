import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type RackVisualiationProps = {
  name: string;
  slots: RackSlotItem[];
  onSelectEquipment(slot: RackSlotItem): void;
} & BoxProps;

const RackVisualization: React.FC<RackVisualiationProps> = ({
  name,
  slots,
  onSelectEquipment,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography variant="h6" textAlign="center">
        {name}
      </Typography>
      <RackSlot items={slots} onSelectEquipment={onSelectEquipment} />
    </Box>
  );
};

type RackSlotProps = {
  items: RackSlotItem[];
  onSelectEquipment(slot: RackSlotItem): void;
};

type RackSlotItem = {
  equipmentId: string;
  position: number;
  finalPosition: number;
  label: string;
};

const RackSlot: React.FC<RackSlotProps> = ({ items, onSelectEquipment }) => {
  return (
    <>
      {items.map((item, idx) => (
        <Paper key={idx} sx={{ padding: "8px 4px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar sx={{ ml: 1 }}>{item.position}</Avatar>
            <Button onClick={() => onSelectEquipment(item)}>
              <Typography>{item.label}</Typography>
            </Button>
            <Avatar sx={{ mr: 1 }}>{item.position}</Avatar>
          </Stack>
        </Paper>
      ))}
    </>
  );
};

export default RackVisualization;

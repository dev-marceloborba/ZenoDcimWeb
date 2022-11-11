import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box, { BoxProps } from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type RackVisualiationProps = {
  name: string;
  slots: RackSlotItem[];
  onSelectEquipment(slot: RackSlotItem): void;
} & PaperProps;

const RackVisualization: React.FC<RackVisualiationProps> = ({
  name,
  slots,
  onSelectEquipment,
  ...props
}) => {
  return (
    <Paper {...props} sx={{ pt: 1 }}>
      <Typography variant="h6" textAlign="center">
        {name}
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <RackSlot items={slots} onSelectEquipment={onSelectEquipment} />
    </Paper>
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
    <div style={{ overflow: "auto", maxHeight: "430px" }}>
      {items.map((item, idx) => {
        return (
          <Paper key={idx} sx={{ padding: "8px 4px" }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              height={`${(item.finalPosition - item.position + 1) * 24}px`}
              minHeight={"24px"}
            >
              <Avatar sx={{ ml: 1 }}>{item.position}</Avatar>
              <Button onClick={() => onSelectEquipment(item)}>
                <Typography>{item.label}</Typography>
              </Button>
              <Avatar sx={{ mr: 1 }}>{item.position}</Avatar>
            </Stack>
            {idx !== items.length - 1 && <Divider sx={{ mt: 1 }} />}
          </Paper>
        );
      })}
    </div>
  );
};

export default RackVisualization;

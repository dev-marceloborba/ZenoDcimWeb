import Card from "modules/shared/components/card/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularIndicator from "modules/shared/components/circular-indicator/CircularIndicator";

type OccupationCardProps = {
  title: string;
  power: {
    current: number;
    total: number;
  };
  capacity: {
    current: number;
    total: number;
  };
  quantity: {
    rooms: number;
    racks: number;
  };
};

const OccupationCard: React.FC<OccupationCardProps> = ({
  title,
  power,
  capacity,
  quantity,
}) => {
  return (
    <Card title={title}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center">
          <InformationDescription title="Potência" />
          <InformationData
            currentValue={power.current}
            totalValue={power.total}
            unit="MW"
          />
          <div style={{ marginLeft: "auto" }}>
            <CircularIndicator
              value={percentageCalc(power.current, power.total)}
            />
          </div>
        </Stack>
        <Stack direction="row" alignItems="center">
          <InformationDescription title="Capacidade" />
          <InformationData
            currentValue={capacity.current}
            totalValue={capacity.total}
            unit="U"
          />
          <div style={{ marginLeft: "auto" }}>
            <CircularIndicator
              value={percentageCalc(capacity.current, capacity.total)}
            />
          </div>
        </Stack>
        <Stack direction="row">
          <InformationDescription title="Número de salas" />
          <BasicData value={quantity.rooms} />
        </Stack>
        <Stack direction="row">
          <InformationDescription title="Número de racks" />
          <BasicData value={quantity.racks} />
        </Stack>
      </Stack>
    </Card>
  );
};

type InformationDescriptionProps = {
  title: string;
};

function InformationDescription({ title }: InformationDescriptionProps) {
  return <Typography variant="subtitle1">{`${title}:`}</Typography>;
}

type InformationDataProps = {
  currentValue: number;
  totalValue: number;
  unit?: string;
};

function InformationData({
  currentValue,
  totalValue,
  unit = "",
}: InformationDataProps) {
  return (
    <Typography
      sx={{ ml: 1 }}
    >{`${currentValue} / ${totalValue} ${unit}`}</Typography>
  );
}

type BasicDataProps = {
  value: number;
};

function BasicData({ value }: BasicDataProps) {
  return <Typography sx={{ ml: 1 }}>{value}</Typography>;
}

function percentageCalc(current: number, total: number) {
  return (current / total) * 100;
}

export default OccupationCard;

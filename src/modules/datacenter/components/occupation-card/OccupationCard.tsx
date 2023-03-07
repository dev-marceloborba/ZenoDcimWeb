import Card from "modules/shared/components/card/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularIndicator from "modules/shared/components/circular-indicator/CircularIndicator";
import useRouter from "modules/core/hooks/useRouter";

type OccupationCardProps = {
  title: string;
  power: {
    current: number;
    total: number;
    unit: string;
  };
  capacity: {
    current: number;
    total: number;
  };
  quantity: {
    rooms: number;
    racks: number;
  };
  hideQuantity?: boolean;
  pathToNavigate?: string;
};

const OccupationCard: React.FC<OccupationCardProps> = ({
  title,
  power,
  capacity,
  quantity,
  hideQuantity = false,
  pathToNavigate,
}) => {
  const { navigate } = useRouter();
  return (
    <Card
      title={title}
      handleHeaderClick={() => navigate(pathToNavigate ?? "", {})}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={4}>
          <InformationDescription
            title="Potência"
            values={{ current: power.current, total: power.total }}
          />
        </Grid>
        <Grid item xs={4}>
          <InformationData
            currentValue={power.current}
            totalValue={power.total}
            unit={power.unit}
          />
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "right" }}>
            <PercentageIndicator
              value={{ current: power.current, total: power.total }}
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <InformationDescription
            title="Capacidade"
            values={{ current: capacity.current, total: capacity.total }}
          />
        </Grid>
        <Grid item xs={4}>
          <InformationData
            currentValue={capacity.current}
            totalValue={capacity.total}
            unit="U"
          />
        </Grid>
        <Grid item xs={4}>
          <div style={{ textAlign: "right" }}>
            <PercentageIndicator
              value={{ current: capacity.current, total: capacity.total }}
            />
          </div>
        </Grid>
        {
          !hideQuantity ? (<>
            <Grid item xs={4}>
              <InformationDescription title="Número de salas" />
            </Grid>
            <Grid item xs={8}>
              <BasicData value={quantity.rooms} />
            </Grid>
            <Grid item xs={4}>
              <InformationDescription title="Número de racks" />
            </Grid>
            <Grid item xs={8}>
              <BasicData value={quantity.racks} />
            </Grid>
          </>) : null
        }
      </Grid>
    </Card>
  );
};

type InformationDescriptionProps = {
  title: string;
  values?: {
    current: number;
    total: number;
  };
};

function InformationDescription({
  title,
  values,
}: InformationDescriptionProps) {
  let color = null;
  if (values) {
    color = colorDetection(values.current, values.total);
  }

  return (
    <Typography
      variant="subtitle1"
      sx={{
        ...(color && {
          color,
          fontWeight: "bold",
        }),
      }}
    >{`${title}:`}</Typography>
  );
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
  const color = colorDetection(currentValue, totalValue);

  return (
    <Typography
      sx={{
        ml: 1,
        ...(color && {
          color,
          fontWeight: "bold",
        }),
      }}
    >{`${currentValue} / ${totalValue} ${unit}`}</Typography>
  );
}

type BasicDataProps = {
  value: number;
};

function BasicData({ value }: BasicDataProps) {
  return <Typography sx={{ ml: 1, my: 1.1 }}>{value}</Typography>;
}

function percentageCalc(current: number, total: number) {
  return (current / total) * 100;
}

function colorDetection(currentValue: number, totalValue: number) {
  const percentage = percentageCalc(currentValue, totalValue);

  if (100 - percentage <= 20 && percentage !== 100) {
    return "yellow";
  } else if (percentage === 100) {
    return "red";
  } else {
    return null;
  }
}

type PercentageIndicatorProps = {
  value: {
    current: number;
    total: number;
  };
};

function PercentageIndicator({
  value: { current, total },
}: PercentageIndicatorProps) {
  const percentage = percentageCalc(current, total);
  const color = colorDetection(current, total);

  let indicatorColor: any = "";

  if (color === "red") {
    indicatorColor = "error";
  } else if (color === "yellow") {
    indicatorColor = "warning";
  } else {
    indicatorColor = "info";
  }

  return <CircularIndicator value={percentage} color={indicatorColor} />;
}

export default OccupationCard;

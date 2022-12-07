import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { EEquipmentStatus } from "modules/automation/models/automation-model";
import AlarmIndicator, {
  AlarmStatus,
} from "modules/automation/components/alarm-indicator/AlarmIndicator";
import useRouter from "modules/core/hooks/useRouter";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { automationPaths } from "modules/automation/routes/paths";

type ParameterData = {
  id: string;
  parameter: string;
  description: string;
  value: number;
  unit: string;
  alarms: number;
  status: EEquipmentStatus;
  pathname: string;
};

type ParameterCardProps = {
  title: string;
  parameters: ParameterData[];
  navigationIds: {
    floorId: string;
    roomId: string;
    equipmentId: string;
  };
};

function getAlarmStatus(alarms: number): AlarmStatus {
  if (alarms === 0) {
    return "normal";
  } else if (alarms > 0 && alarms < 2) {
    return "alert";
  } else {
    return "danger";
  }
}

const ParameterCard: React.FC<ParameterCardProps> = ({ ...props }) => {
  const { navigate } = useRouter();

  const handleOpenParameterDetails = (parameter: ParameterData) => {
    console.log(parameter);
    navigate(
      compositePathRoute([
        HomePath,
        AutomationPath,
        automationPaths.parameterDetails.fullPath
          .replace(":floorId", props.navigationIds.floorId)
          .replace(":roomId", props.navigationIds.roomId)
          .replace(":equipmentId", props.navigationIds.equipmentId)
          .replace(":equipmentParameterId", parameter.id),
      ]),
      {
        state: {
          data: parameter,
        },
      }
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {props.title}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Parâmetro</TableCell>
                {/* <TableCell>Descrição</TableCell> */}
                <TableCell>Valor</TableCell>
                <TableCell>Alarmes</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.parameters.map((parameter) => (
                <TableRow
                  key={parameter.description}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpenParameterDetails(parameter)}
                >
                  <TableCell>{parameter.parameter}</TableCell>
                  {/* <TableCell>{parameter.description}</TableCell> */}
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >{`${parameter.value} ${parameter.unit}`}</TableCell>
                  <TableCell>
                    <AlarmIndicator
                      description=""
                      status={getAlarmStatus(parameter.alarms)}
                      routeDestinationPath="/alarms"
                      clickable
                    />
                  </TableCell>
                  <TableCell>{parameter.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ParameterCard;

import Button from "@mui/material/Button";
import Card, { CardProps } from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import BasicInfo from "modules/shared/components/basic-info/BasicInfo";

type RackEquipmentInfoCardProps = {
  equipment: string;
  model: string;
  manufactor: string;
  serialNumber: string;
  rackPosition: number;
  size: number;
  showActions?: boolean;
  onEdit?(data: any): void;
  onDelete?(data: any): void;
} & CardProps;

const RackEquipmentInfoCard: React.FC<RackEquipmentInfoCardProps> = ({
  showActions,
  onEdit,
  onDelete,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardHeader title={props.title} />
      <CardContent>
        <BasicInfo name="Equipamento" description={props.equipment} />
        <Divider />
        <BasicInfo name="Modelo" description={props.model} />
        <Divider />
        <BasicInfo name="Fabricante" description={props.manufactor} />
        <Divider />
        <BasicInfo name="Número de série" description={props.serialNumber} />
        <Divider />
        <BasicInfo name="Posição no rack" description={props.rackPosition} />
        <Divider />
        <BasicInfo name="Tamanho" description={props.size} />
      </CardContent>
      {showActions && (
        <CardActions>
          <Button>Editar</Button>
          <Button>Excluir</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default RackEquipmentInfoCard;

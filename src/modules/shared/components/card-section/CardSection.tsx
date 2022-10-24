import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import useRouter from "modules/core/hooks/useRouter";

export type CardSectionProps = {
  title: string;
  description: string;
  path?: string;
};

const CardSection: React.FC<CardSectionProps> = ({
  title,
  description,
  path,
}) => {
  const { navigate } = useRouter();

  const handleCardDetails = () => {
    navigate(path ?? "", { state: null });
  };

  return (
    <Card sx={{ cursor: "pointer" }} onClick={handleCardDetails}>
      <CardHeader title={title} subheader={description} />
      <CardContent></CardContent>
    </Card>
  );
};

export default CardSection;

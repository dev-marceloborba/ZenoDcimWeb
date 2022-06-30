import { Card, CardContent } from "@mui/material";

type CardWrapperProps = {
  children: React.ReactNode;
};

export default function CardWrapper(props: CardWrapperProps) {
  const { children } = props;

  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

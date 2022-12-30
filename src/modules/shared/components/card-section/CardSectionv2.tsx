import Paper, { PaperProps } from "@mui/material/Paper";

type CardSectionProps = {
  title?: string;
} & PaperProps;

const CardSection: React.FC<CardSectionProps> = ({
  title = "",
  children,
  ...props
}) => {
  return (
    <Paper
      {...props}
      sx={{
        ...props.sx,
        padding: "8px 12px",
      }}
    >
      {children}
    </Paper>
  );
};

export default CardSection;

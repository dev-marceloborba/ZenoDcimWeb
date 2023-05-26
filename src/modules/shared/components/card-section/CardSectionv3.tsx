import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type CardSectionProps = {
  title: string;
  items: CardItem[] | null;
} & Pick<PaperProps, "sx">;

type CardItem = {
  title: string;
  description: string | null | undefined;
  defaultSize?: number;
  isInvisible?: boolean;
};

const CardSection: React.FC<CardSectionProps> = ({ title, items, sx }) => {
  console.log(items);
  return (
    <Paper
      sx={{
        padding: "8px 12px",
        ...sx,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ textDecoration: "underline", my: 1 }}
      >
        {title}
      </Typography>
      <Grid container rowSpacing={2} columnSpacing={1}>
        {items?.map((item, idx) => {
          if (item.isInvisible) {
            return null;
          }
          return (
            <Grid key={idx} item md={item.defaultSize ?? 3}>
              <Typography variant="subtitle2" color="#9CA7B1">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="#9CA7B1">
                {item.description}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default CardSection;

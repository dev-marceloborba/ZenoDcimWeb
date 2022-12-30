import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type CardSectionProps = {
  title: string;
  items: CardItem[];
};

type CardItem = {
  title: string;
  description: string;
};

const CardSection: React.FC<CardSectionProps> = ({ title, items }) => {
  return (
    <Paper
      sx={{
        padding: "8px 12 px",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ textDecoration: "underline", my: 1 }}
      >
        <Grid container rowSpacing={1}>
          {items.map((item, idx) => (
            <Grid key={idx} item md={3}>
              <Typography variant="subtitle2" color="#9CA7B1">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="#9CA7B1">
                {item.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Typography>
    </Paper>
  );
};

export default CardSection;

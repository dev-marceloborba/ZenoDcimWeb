import GlobalStyles from "@mui/material/GlobalStyles";

export default function GlobalStyle() {
  return (
    <GlobalStyles
      styles={{
        "*::webkit-scrollbar": {
          width: "0.25rem",
        },
        "*::webkit-scrollbar-track": {
          background: "#1e1e24",
        },
        "*::webkit-scrollbar-thumb": {
          background: "#6649b8",
        },
      }}
    />
  );
}

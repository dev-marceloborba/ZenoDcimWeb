const environmentDefinition = {
  prod: "https://zenodcimapi.azurewebsites.net/",
  dev: "http://localhost:5000/",
};

const environment =
  process.env.NODE_ENV === "production"
    ? environmentDefinition.prod
    : environmentDefinition.dev;

export default environment;

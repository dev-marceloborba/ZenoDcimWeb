const compositePathRoute = (paths: string[]) => {
  const newPath = "";
  paths.forEach((path) => {
    newPath.concat("/" + path);
  });
  return newPath;
};

export default compositePathRoute;

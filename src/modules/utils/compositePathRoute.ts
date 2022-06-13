const compositePathRoute = (paths: string[]) => {
  let newPath = "";
  for (let i = 0; i < paths.length; i++) {
    newPath += `/${paths[i]}`;
  }
  return newPath;
};

export default compositePathRoute;

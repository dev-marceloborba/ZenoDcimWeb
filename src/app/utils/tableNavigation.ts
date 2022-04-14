import { createSearchParams, NavigateFunction } from "react-router-dom";

const tableNavigation = (
  row: any,
  navigate: NavigateFunction,
  editPage: string
) => {
  console.log(row.toString());
  //   navigate({
  //     pathname: editPage,
  //     search: `?${createSearchParams(row)}`,
  //   });
};

export default tableNavigation;

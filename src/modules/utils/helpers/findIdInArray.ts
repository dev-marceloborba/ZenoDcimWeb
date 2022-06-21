export const findIdInArray = (
  array: any[],
  description: string,
  property: string
) => {
  return array.find((x) => x[property] === description) as string;
};

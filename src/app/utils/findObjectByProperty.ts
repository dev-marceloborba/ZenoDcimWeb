const findObjectByProperty = (array: any[], property: any, value: any) => {
  return array.find((item) => item[property] === value);
};

export default findObjectByProperty;

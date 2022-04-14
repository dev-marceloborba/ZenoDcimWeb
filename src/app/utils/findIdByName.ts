const findIdByName = (name: string, list: any[]): string | null => {
  const item = list.find((item: any) => item.name === name);
  return item ? item.id : null;
};

export default findIdByName;

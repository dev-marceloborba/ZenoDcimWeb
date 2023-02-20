export default function getNestedProperty(
  object: any,
  propertyPath: string[]
): any {
  if (propertyPath.length === 1) {
    return object[propertyPath[0]];
  }

  const nextProperty = propertyPath.shift();
  const nestedObject = object[nextProperty as keyof typeof object];
  return getNestedProperty(nestedObject, propertyPath);
}

export function getCleanPathname(dirtyPathname: string) {
  return dirtyPathname
    .replaceAll("*", "")
    .replaceAll("_", "")
    .replaceAll(/\s/g, "");
}

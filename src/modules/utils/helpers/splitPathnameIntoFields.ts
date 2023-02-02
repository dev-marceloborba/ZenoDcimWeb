type DataStructure = {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  parameter: string;
  alarm?: string;
};

export default function splitPathnameIntoFields(
  pathname: string
): DataStructure {
  const fields = pathname.split("*").map((x) => x.replaceAll("_", " "));
  return {
    site: fields[0],
    building: fields[1],
    floor: fields[2],
    room: fields[3],
    equipment: fields[4],
    parameter: fields[5],
    alarm: fields.length === 7 ? fields[6] : "",
  };
}

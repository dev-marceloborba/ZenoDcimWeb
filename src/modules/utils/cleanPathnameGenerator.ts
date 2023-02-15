interface TagComposition {
  site: string;
  building: string;
  floor: string;
  room: string;
  equipment: string;
  parameter: string;
}

export default function cleanPathnameGenerator(options: TagComposition) {
  const { site, building, floor, room, equipment, parameter } = options;
  let arr: string[] = [];

  arr = [site, building, floor, room, equipment, parameter];

  return arr.join("").replaceAll(/\s/g, "");
}

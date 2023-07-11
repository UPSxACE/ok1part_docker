function addInStringPosition(
  originalString: string,
  newThing: string,
  position: number
) {
  return (
    originalString.substring(0, position) +
    newThing +
    originalString.substring(position, originalString.length)
  );
}

export default function convertDateFromDb(date: string) {
  let str = addInStringPosition(date, '-', 4);
  str = addInStringPosition(str, '-', 6 + 1);
  str = addInStringPosition(str, ' ', 8 + 2);
  return str;
}

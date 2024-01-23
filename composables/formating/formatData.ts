export function convertToDate(str: string) {
  const day = str.toString().substring(0, 2);
  const month = str.toString().substring(2, 4);
  const year = str.toString().substring(4);

  return `${year}-${month}-${day}`;
}

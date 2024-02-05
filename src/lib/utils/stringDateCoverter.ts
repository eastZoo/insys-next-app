/**
 *
 * @param inputDate 날짜 타입 string, date
 * @param lastUnit m,d,h
 * @returns
 */
export default function StringDateConverter(
  inputDate: string | Date,
  lastUnit: string = "full"
) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  if (lastUnit == "m") return `${year}.${month}`;

  const day = date.getDate().toString().padStart(2, "0");
  if (lastUnit == "d") return `${year}.${month}.${day}`;

  const hour = date.getHours().toString().padStart(2, "0");
  if (lastUnit == "h") return `${year}.${month}.${day}.${hour}`;

  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}

import dayjs from "dayjs";
import { showAlert } from "../../components/containers/Alert";

export const validateDateRange = (
  startDate?: string | null,
  endDate?: string | null
): boolean => {
  if (!startDate || !endDate) {
    showAlert("날짜를 입력해주세요.");
    return false;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const oneMonthLater = start.add(30, "days");

  if (end.isAfter(oneMonthLater)) {
    showAlert("조회 기간은 30일을 초과할 수 없습니다.");
    return false;
  }

  return true;
};
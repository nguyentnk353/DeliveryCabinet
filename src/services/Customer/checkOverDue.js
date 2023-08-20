import axiosInstance from '../axiosInstance';

export default function checkOverDue() {
  const url = `/user/check-overdue`;
  return axiosInstance
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
}

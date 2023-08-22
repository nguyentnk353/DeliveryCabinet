import axiosInstance from '../axiosInstance';

export default function checkWarningOverDue() {
  const url = `/user/warning-overdue`;
  return axiosInstance
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
}

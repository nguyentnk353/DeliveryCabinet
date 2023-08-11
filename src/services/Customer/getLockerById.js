import axiosInstance from '../axiosInstance';

export default function getLockerById(lockerId) {
  const url = '/lockers';
  return axiosInstance
    .get(url, {
        params: {
          Id: lockerId,
        },
      })
    .then((response) => response.data)
    .catch((err) => err.response.data);
}

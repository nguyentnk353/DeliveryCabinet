import axiosInstance from './axiosInstance';

export default function deleteArea(id) {
  const url = 'areas/' + id;

  return axiosInstance
    .delete(url)
    .then((response) => response)
    .catch((err) => err);
}

import axios from 'axios';
import axiosInstance from './axiosInstance';

export default function updateArea(props) {
  const url = 'areas';
  return axiosInstance
    .put(url, {  
        id: props.id,
        name: props.name,
        description: props.description,
        isEnable: props.isEnable,
    })
    .then((response) => response)
    .catch((err) => err.response);
}

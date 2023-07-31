import axios from 'axios';
import axiosInstance from '../axiosInstance';

export default function getAllStore(props) {
  const url = '/stores';
  return axiosInstance
    .get(url, 
      {
      params: {
        Name: props.search,
        Province: props.Province,
        City: props.City,
        District: props.District,
        // Address: props.search,
        
        'StoreType.IsEnable' : true ,
        'ServiceType.IsEnable' : true ,
        'Area.IsEnable' : true,
        IsEnable: props.isEnable,                 
        PageIndex: props.PageIndex,
        PageSize: props.PageSize,
      },
    }
    )
    .then((response) => response.data)
    .catch((err) => err.response.data);
}

import axiosInstance from "../axiosInstance";

export default function updateAccCustomer(props) {
  const url = '/user';
  return axiosInstance
    .put(url, {
        id: props?.id,
        fullName: props?.fullName,
        email: props.email,
        phone: props.phone,
        dob: props?.dob,
        isEnable: props?.isEnable,
        imgUrl: props?.imgUrl,
    })
    .then((response) => response)
    .catch((err) => err.response);
}

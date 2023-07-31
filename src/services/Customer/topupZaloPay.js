import axiosInstance from '../axiosInstance';

function topupZaloPay(props) {
    const url = '/orders/zalopay';

    return axiosInstance
        .post(url, {},
            {params: {
                amount: props.amount,
                url: props.url,
            },}
        )
        .then((response) => response.data)
        .catch((err) => err.data);
}

export default topupZaloPay;
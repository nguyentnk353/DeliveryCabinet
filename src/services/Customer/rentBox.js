import axiosInstance from '../axiosInstance';

function rentBox(props) {
    const url = '/orders';

    return axiosInstance
        .post(url, {},
            {params: {
                storeid: props.storeId,
                boxsizeid: props.boxSizeId,
                boxtypeid: props.boxTypeId,
                servicetypeid: props.servicetypeId,
            },}
        )
        .then((response) => response)
        .catch((err) => err);
}

export default rentBox;
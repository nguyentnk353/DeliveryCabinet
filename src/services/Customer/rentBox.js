import axiosInstance from '../axiosInstance';

function rentBox(props) {
    const url = '/orders/locker';

    return axiosInstance
        .post(url, {},
            {params: {
                lockerid: props.lockerId,
                boxsizeid: props.boxSizeId,
                boxtypeid: props.boxTypeId,
                servicetypeid: props.servicetypeId,
            },}
        )
        .then((response) => response.data)
        .catch((err) => err.data);
}

export default rentBox;
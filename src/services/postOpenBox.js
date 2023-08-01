import axios from 'axios';
import React from 'react';

function postOpenBox(payload) {
  const url = 'https://deliver-store.tk/system/api/v1/interaction-logs';
  return axios
    .post(
      url,
      {},
      {
        params: payload,
      }
    )
    .then((response) => response)
    .catch((err) => err);
}

export default postOpenBox;

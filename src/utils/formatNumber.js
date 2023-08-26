import React from 'react';

export const formatVND = (val) => {
  return new Intl.NumberFormat('vi-VN').format(val);
};

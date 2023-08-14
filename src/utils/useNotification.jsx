import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import React, { Fragment, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const useNotification = () => {
  const [conf, setConf] = useState({});

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key) => (
    <Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </Fragment>
  );

  useEffect(() => {
    if (conf?.msg) {
      let variant = 'info';
      if (conf.variant) {
        variant = conf.variant;
      }
      enqueueSnackbar(conf.msg, {
        variant: variant,
        autoHideDuration: 3000,
        action,
      });
    }
  }, [conf]);
  return [conf, setConf];
};

export default useNotification;

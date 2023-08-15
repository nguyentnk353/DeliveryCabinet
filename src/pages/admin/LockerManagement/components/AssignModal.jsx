import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../../utils/useNotification';
import { useState } from 'react';
import { useMount } from 'ahooks';
import getStoreList from '../../../../services/getStoreList';
import updateLocker from '../../../../services/updateLocker';

const AssignModal = ({ open, setOpen, field }) => {
  const [select, setSelect] = useState({ name: '' });
  const [storeList, setStoreList] = useState([]);
  const [msg, sendNotification] = useNotification();

  useMount(() => {
    const payload = {
      PageIndex: 1,
      PageSize: 1000,
      isEnable: true,
    };
    getStoreList(payload)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setStoreList(newTable);
      })
      .catch((err) => {
        //   sendNotification({ msg: err, variant: 'error' });
      });
  });
  const handleClose = () => {
    setSelect({ name: '' });
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };
  function handleAssign() {
    const api = {
      id: field.id,
      name: field.name,
      storeId: select.id,
      description: field.description,
      isEnable: field.status,
    };
    updateLocker(api)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Cabinet assign success',
            variant: 'success',
          });
        } else {
          sendNotification({ msg: 'Cabinet assign fail', variant: 'error' });
        }
        handleClose();
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h2'
            textAlign='center'
            fontWeight='bold'
            color={blue[500]}
          >
            ASSIGN CABINET
          </Typography>
          <Box>
            <Box
              sx={{ paddingLeft: '30%', paddingTop: '4%', paddingBottom: '4%' }}
            >
              <Autocomplete
                disablePortal
                id='storeList'
                options={storeList}
                // disableClearable
                getOptionLabel={(option) => option.name}
                value={select}
                onChange={(_, e) => {
                  setSelect(e);
                }}
                // value={ward}
                sx={{ width: '60%' }}
                renderInput={(params) => (
                  <TextField {...params} label='Store' />
                )}
              />
            </Box>
            {select.name && (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    //   textAlign: 'center',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '50%' }}>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Id :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.id}
                      </Typography>
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Address :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.address}
                      </Typography>
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Store owner :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.user?.fullName}
                        <Typography variant='body2' sx={{ opacity: '50%' }}>
                          Email: {select?.user?.email}
                        </Typography>
                      </Typography>
                    </Typography>
                  </Box>
                  <Box sx={{ width: '45%' }}>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Store type :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.storeType?.name}
                      </Typography>
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Area :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.area?.name}
                      </Typography>
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ fontWeight: '700', marginBottom: '1rem' }}
                    >
                      Service type :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.serviceType?.name}
                      </Typography>
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: '700' }}>
                      Description :{' '}
                      <Typography display='inline' variant='body1'>
                        {select?.description}
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant='contained' onClick={handleAssign}>
              Assign
            </Button>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AssignModal;

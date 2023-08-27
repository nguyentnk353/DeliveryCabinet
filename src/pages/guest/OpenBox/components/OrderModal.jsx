import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const OrderModal = ({ open, setOpen, box }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  console.log(box);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
  };
  return (
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
          textAlign='center'
          fontWeight='bold'
          color={blue[500]}
        >
          THUÊ TỦ
        </Typography>

        <Box sx={{ padding: '1rem' }}>{box.id}</Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant='contained' type='submit'>
            Xác nhận
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderModal;

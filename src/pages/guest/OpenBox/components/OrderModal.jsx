import * as yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

const OrderModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {},
  });
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
          component='h2'
          textAlign='center'
          fontWeight='bold'
          color={blue[500]}
        >
          XÁC NHẬN MỞ TỦ
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ padding: '2rem' }}>
            <TextField
              margin='normal'
              fullWidth
              id='code'
              label='Nhập mã mở tủ'
              autoFocus
              // type='number'
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
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
            <Button variant='contained' type='submit'>
              Xác nhận
            </Button>
            <Button variant='outlined' onClick={handleClose}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderModal;

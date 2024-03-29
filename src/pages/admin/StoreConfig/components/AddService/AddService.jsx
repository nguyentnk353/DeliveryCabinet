import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import createServiceType from '../../../../../services/createServiceType';
import useNotification from '../../../../../utils/useNotification';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
});
const AddService = ({ open, setOpen, msg, sendNotification }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
      },
    });
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        name: val.name,
      };
      createServiceType(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Service type create success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Service type create fail',
              variant: 'error',
            });
          }
          handleClose();
        })
        .catch((err) => {
          console.log({ msg: err, variant: 'error' });
        });
    },
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: '2rem',
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
          ADD SERVICE TYPE
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ paddingBottom: '1rem' }}>
            <TextField
              margin='normal'
              fullWidth
              id='name'
              label='Name'
              autoFocus
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
              Add
            </Button>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddService;

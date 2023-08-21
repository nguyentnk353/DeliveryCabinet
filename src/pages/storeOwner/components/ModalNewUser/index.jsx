import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import createUser from '../../../../services/createUser';
import useNotification from '../../../../utils/useNotification';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const validationSchema = yup.object({
  name: yup.string('Enter box type name').required('Name is required'),
});
const index = ({ open, setOpen }) => {
  const [msg, sendNotification] = useNotification();
  const [date, setDate] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
      },
    });
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
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
      //   createUser(api)
      //     .then((res) => {
      //       if (res.status == 201) {
      //         sendNotification({
      //           msg: 'Box type create success',
      //           variant: 'success',
      //         });
      //         setCreateSuccess(true);
      //       } else {
      //         sendNotification({ msg: 'Box type create fail', variant: 'error' });
      //       }
      //       handleClose();
      //     })
      //     .catch((err) => {
      //       sendNotification({ msg: err, variant: 'error' });
      //     });
    },
  });
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
          ADD NEW USER
        </Typography>
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <Box sx={{ padding: '2rem' }}>
            <TextField
              margin='normal'
              fullWidth
              id='loginName'
              label='User name'
              autoFocus
              value={formik.values.loginName}
              onChange={formik.handleChange}
              error={
                formik.touched.loginName && Boolean(formik.errors.loginName)
              }
              helperText={formik.touched.loginName && formik.errors.loginName}
            />
            <TextField
              margin='normal'
              fullWidth
              id='name'
              label='Full name'
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='Email'
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin='normal'
              fullWidth
              id='phone'
              label='Phone'
              autoFocus
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date of birth'
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
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

export default index;

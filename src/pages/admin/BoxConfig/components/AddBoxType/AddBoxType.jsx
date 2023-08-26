import React, { useState } from 'react';
import { blue } from '@mui/material/colors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../../../utils/useNotification';
import createBoxType from '../../../../../services/createBoxType';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const validationSchema = yup.object({
  name: yup.string('Enter box type name').required('Name is required'),
});
const AddBoxType = ({ open, setOpen, msg, sendNotification }) => {
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
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: '2rem',
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [createSuccess, setCreateSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        name: val.name,
      };
      createBoxType(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Box type create success',
              variant: 'success',
            });
          } else {
            sendNotification({ msg: 'Box type create fail', variant: 'error' });
          }
          handleClose();
        })
        .catch((err) => {
          console.log({ msg: err, variant: 'error' });
        });
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
          ADD BOX TYPE
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

export default AddBoxType;

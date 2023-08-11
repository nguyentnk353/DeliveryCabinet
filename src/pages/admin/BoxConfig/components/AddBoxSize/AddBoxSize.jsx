import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useNotification from '../../../../../utils/useNotification';
import createBoxSize from '../../../../../services/createBoxSize';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
  length: yup
    .number()
    .required('Length is required')
    .positive('Accept only positive integer > 0')
    .integer('Accept only positive integer > 0'),
  height: yup
    .number()
    .required('Height is required')
    .positive('Accept only positive integer > 0')
    .integer('Accept only positive integer > 0'),
});
const AddBoxSize = ({ open, setOpen }) => {
  const [msg, sendNotification] = useNotification();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        length: 0,
        height: 0,
        description: '',
      },
    });
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [createSuccess, setCreateSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      length: 0,
      height: 0,
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        name: val.name,
        length: val.length,
        height: val.height,
        description: val.description,
      };

      createBoxSize(api)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Box size create success',
              variant: 'success',
            });
            setCreateSuccess(true);
          } else {
            sendNotification({ msg: 'Box size create fail', variant: 'error' });
          }

          handleClose();
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
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
          ADD NEW BOX SIZE
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
              required
              id='name'
              label='Name'
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                margin='normal'
                fullWidth
                required
                id='length'
                label='Length'
                value={formik.values.length}
                onChange={formik.handleChange}
                error={formik.touched.length && Boolean(formik.errors.length)}
                helperText={formik.touched.length && formik.errors.length}
              />
              <TextField
                margin='normal'
                fullWidth
                required
                id='height'
                label='Height'
                value={formik.values.height}
                onChange={formik.handleChange}
                error={formik.touched.height && Boolean(formik.errors.height)}
                helperText={formik.touched.height && formik.errors.height}
              />
            </Box>
            <TextField
              margin='normal'
              fullWidth
              id='description'
              label='Description'
              value={formik.values.description}
              onChange={formik.handleChange}
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

export default AddBoxSize;

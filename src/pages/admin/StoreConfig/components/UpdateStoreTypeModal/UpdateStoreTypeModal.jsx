import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { blue } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { MenuItem } from '@mui/material';
import { useMount } from 'ahooks';
import updateArea from '../../../../../services/updateArea';
import useNotification from '../../../../../utils/useNotification';
import updateStoreType from './../../../../../services/updateStoreType';
const UpdateStoreTypeModal = ({
  showModal,
  onOpen,
  onClose,
  info,
  msg,
  sendNotification,
}) => {
  const [field, setField] = useState({
    id: info?.id,
    name: info?.name,
    status: info?.isEnable,
    description: info?.description,
  });

  useEffect(() => {
    setField({
      id: info?.id,
      name: info?.name,
      status: info?.isEnable,
      description: info?.description,
    });
  }, [info, onOpen]);

  const validationSchema = yup.object({
    name: yup.string('Enter store type name').required('Name is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: field,
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const api = {
        id: field.id,
        name: val.name,
        description: val.description,
        isEnable: field.status,
      };
      updateStoreType(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Store type update success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Store type update fail',
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

  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        description: '',
        status: '',
      },
    });
    onClose();
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '16px',
    boxShadow: 24,
    p: '2rem',
  };

  return (
    <Modal
      open={showModal}
      onClose={onClose}
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
          UPDATE STORE TYPE
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ paddingBottom: '1rem' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
              <Box sx={{ width: '50%', paddingTop: '1%' }}>
                <FormControl fullWidth>
                  <InputLabel id='statusLabel'>Status</InputLabel>
                  <Select
                    labelId='statusLabel'
                    id='status'
                    value={field.status}
                    label='Status'
                    onChange={(e) => {
                      setField((preState) => ({
                        ...preState,
                        status: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <TextField
              margin='normal'
              fullWidth
              id='description'
              label='Description'
              autoFocus
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
              Update
            </Button>
            <Button variant='outlined' onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateStoreTypeModal;

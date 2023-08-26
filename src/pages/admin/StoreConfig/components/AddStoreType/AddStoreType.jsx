import {
  Box,
  Button,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import createStoreType from '../../../../../services/postStoreType';
const AddStoreType = ({ showModal, onClose, msg, sendNotification }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [error, setError] = useState(false);
  const [values, setValues] = useState({ name: '', description: '' });

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
    setValues({
      ...values,
      name: e.target.value,
    });

    setError(false);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
    setValues({
      ...values,
      description: e.target.value,
    });
  };
  useEffect(() => {
    setError(false);
  }, [onClose]);
  const handleSave = (e) => {
    // do something with the inputs
    if (input1 === '') {
      setError(true);
    } else {
      createStoreType(values)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Store type create success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Store type create fail',
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // close the modal
      onClose();
      setInput1('');
      setInput2('');
      setError(false);
      setValues({ name: '', description: '' });
    }
  };

  const modalStyle = {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '16px',
  };

  return (
    <Modal open={showModal} onClose={onClose} error={error}>
      <Box style={modalStyle}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: '700',
            textAlign: 'center',
            color: '#2196f3',
          }}
        >
          ADD STORE TYPE
        </Typography>
        <Box sx={{ padding: '1rem 0' }}>
          <TextField
            label='Name'
            variant='outlined'
            value={input1}
            onChange={handleInputChange1}
            fullWidth
            margin='normal'
            required
            error={error}
          />
          {error && (
            <FormHelperText error>This field is required</FormHelperText>
          )}
          <TextField
            label='Description'
            variant='outlined'
            value={input2}
            onChange={handleInputChange2}
            fullWidth
            margin='normal'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStoreType;

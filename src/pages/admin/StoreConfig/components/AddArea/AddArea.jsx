import {
  Box,
  Button,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import createArea from '../../../../../services/postArea';

const AddArea = ({ showModal, onClose, msg, sendNotification }) => {
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

  const handleSave = (e) => {
    // do something with the inputs
    if (input1 === '') {
      setError(true);
    } else {
      createArea(values)
        .then((res) => {
          if (res.status == 201) {
            sendNotification({
              msg: 'Area create success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Area create fail',
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
  useEffect(() => {
    setError(false);
  }, [onClose]);
  const modalStyle = {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '3%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '10px',
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
          ADD NEW AREA
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
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSave}>
            Add
          </Button>
          <Button variant='outlined' onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddArea;

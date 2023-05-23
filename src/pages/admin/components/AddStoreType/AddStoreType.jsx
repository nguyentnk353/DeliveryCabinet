import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

function AddStoreType(props) {
    const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };

  const handleSave = () => {
    props.onSave(field1, field2);
    setField1('');
    setField2('');
  };

  const handleClose = () => {
    props.onClose();
    setField1('');
    setField2('');
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogContent>
        <TextField
          label="Field 1"
          value={field1}
          onChange={handleField1Change}
          fullWidth
        />
        <TextField
          label="Field 2"
          value={field2}
          onChange={handleField2Change}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStoreType;
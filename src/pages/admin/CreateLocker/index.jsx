import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from '@mui/material';
import { useMount } from 'ahooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import getBoxTypeList from './../../../services/getBoxTypeList';
import getBoxSizeList from '../../../services/getBoxSizeList';
import { useLocation, useNavigate } from 'react-router-dom';
import createLocker from '../../../services/createLocker';
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = yup.object({
  name: yup.string('Enter locker name').required('Name of locker is required'),
  row: yup.string('Enter locker rows').required('Rows of locker is required'),
  col: yup
    .string('Enter locker columns')
    .required('Columns of locker is required'),
});

const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storeId = location.state.storeId;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    paddingBottom: '60%',
  }));

  const [boxSizeList, setBoxSizeList] = useState([]);
  const [boxTypeList, setBoxTypeList] = useState([]);
  const boxSize1 = boxSizeList.find((e) => e.id == 1);
  const boxType1 = boxTypeList.find((e) => e.id == 1);
  const [boxClick, setBoxClick] = useState(false);
  const [createButton, setCreateButton] = useState(false);
  const [boxNum, setBoxNum] = useState({
    id: 0,
    key: 0,
    Description: '',
    LockerId: '',
    BoxType: '',
    Code: '',
    IsFake: '',
    BoxSize: {
      name: '',
      description: '',
      length: 1,
      height: 1,
    },
    FromTop: '',
    FromLeft: '',
  });
  const [boxSize, setBoxSize] = useState({
    name: '',
    description: '',
    length: 1,
    height: 1,
  });
  const [boxType, setBoxType] = useState({ name: '' });
  const [data, setData] = useState({
    name: '',
    description: '',
    StoreId: storeId,
    row: 0,
    col: 0,
    isPattern: false,
    box: [],
  });

  const [gridData, setGridData] = useState({
    row: 0,
    col: 0,
    gridAmount: 0,
    box: [],
    oldOversize: [],
  });

  useMount(() => {
    const api = {
      Name: '',
      PageIndex: 1,
      PageSize: 1000,
      IsEnable: true,
    };
    getBoxSizeList(api)
      .then((res) => {
        const newList = res.items.map((e) => e);
        setBoxSizeList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
    getBoxTypeList(api)
      .then((res) => {
        const newList = res.items.map((e) => e);
        setBoxTypeList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      row: '',
      col: '',
      boxDescription: '',
      isPattern: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const rowNum = Number.parseInt(values.row, 16);
      const colNum = Number.parseInt(values.col, 16);

      if (
        values.name != data.name ||
        values.description != data.description ||
        values.isPattern != data.isPattern
      ) {
        setData((preState) => ({
          ...preState,
          name: values.name,
          description: values.description,
          isPattern: values.isPattern,
        }));
      }

      if (data.box.length == 0) {
        setData((preState) => ({
          ...preState,
          row: rowNum,
          col: colNum,
        }));
        const total = rowNum * colNum;
        const fakeData = new Array(total).fill().map((_, box) => box);

        let left = 0;
        let top = 1;
        const newBox = fakeData.map((e, i) => {
          if (left == colNum) {
            left = 1;
            top++;
          } else left++;
          const index1 = i + 1;
          return {
            id: index1,
            key: i,
            Description: values.boxDescription,
            LockerId: 1,
            BoxType: boxType1,
            Code: 'Box ' + index1,
            IsFake: false,
            BoxSize: boxSize1,
            FromTop: top,
            FromLeft: left,
          };
        });
        setData((preState) => ({
          ...preState,
          box: newBox ?? [],
        }));
        setGridData((preState) => ({
          ...preState,
          row: rowNum,
          col: colNum,
          gridAmount: newBox.length,
          box: newBox ?? [],
        }));
      } else if (
        data.box.length > 0 &&
        (data.row != rowNum || data.col != colNum)
      ) {
        setData((preState) => ({
          ...preState,
          row: rowNum,
          col: colNum,
        }));
        const total = rowNum * colNum;
        const fakeData = new Array(total).fill().map((_, box) => box);

        let left = 0;
        let top = 1;
        const newBox = fakeData.map((e, i) => {
          if (left == colNum) {
            left = 1;
            top++;
          } else left++;
          const index1 = i + 1;
          return {
            id: index1,
            key: i,
            Description: values.boxDescription,
            LockerId: 1,
            BoxType: boxType1,
            Code: 'Box ' + index1,
            IsFake: false,
            BoxSize: boxSize1,
            FromTop: top,
            FromLeft: left,
          };
        });
        setData((preState) => ({
          ...preState,
          box: newBox ?? [],
        }));
        setGridData((preState) => ({
          ...preState,
          row: rowNum,
          col: colNum,
          gridAmount: newBox.length,
          box: newBox ?? [],
        }));
      } else {
        if (
          boxNum.FromTop + boxSize.height - 1 > gridData.row ||
          boxNum.FromLeft + boxSize.length - 1 > gridData.col
        ) {
          setNotify((preState) => ({
            ...preState,
            isOpen: true,
            msg: 'Box is bigger than locker',
            type: 'warning',
          }));
        } else {
          const listBox = [];
          const boxOversize = [];

          if (boxSize.length > 1) {
            for (let i = 1; i < boxSize.length; i++) {
              boxOversize.push({
                id: boxNum.id,
                key: boxNum.key,
                Description: boxNum.Description,
                LockerId: boxNum.LockerId,
                BoxType: boxNum.BoxType,
                Code: boxNum.Code,
                IsFake: true,
                BoxSize: boxSize1,
                FromTop: boxNum.FromTop,
                FromLeft: boxNum.FromLeft + i,
              });
            }
          }
          if (boxSize.height > 1) {
            for (let i = 1; i < boxSize.height; i++) {
              boxOversize.push({
                id: boxNum.id,
                key: boxNum.key,
                Description: boxNum.Description,
                LockerId: boxNum.LockerId,
                BoxType: boxNum.BoxType,
                Code: boxNum.Code,
                IsFake: true,
                BoxSize: boxSize1,
                FromTop: boxNum.FromTop + i,
                FromLeft: boxNum.FromLeft,
              });
            }
          }
          if (boxSize.height > 1 && boxSize.length > 1) {
            for (let i = 1; i < boxSize.height; i++) {
              boxOversize.push({
                id: boxNum.id,
                key: boxNum.key,
                Description: boxNum.Description,
                LockerId: boxNum.LockerId,
                BoxType: boxNum.BoxType,
                Code: boxNum.Code,
                IsFake: true,
                BoxSize: boxSize1,
                FromTop: boxNum.FromTop + i,
                FromLeft: boxNum.FromLeft + i,
              });
            }
          }
          let boxOversizeIndex = 0;
          let left = 0;
          let top = 1;
          const fakeGrid = gridData.box.map((e, i) => {
            if (left == colNum) {
              left = 1;
              top++;
            } else left++;
            const index1 = i + 1;

            if (boxOversize[boxOversizeIndex] === undefined) {
              boxOversize[boxOversizeIndex]--;
            }

            if (
              boxOversize[boxOversizeIndex].FromTop == e.FromTop &&
              boxOversize[boxOversizeIndex].FromLeft == e.FromLeft
            ) {
              boxOversizeIndex++;
              if (!undefined) {
                return boxOversize[boxOversizeIndex - 1];
              }
            } else if (
              boxNum.FromTop == e.FromTop &&
              boxNum.FromLeft == e.FromLeft
            ) {
              return {
                id: boxNum.id,
                key: boxNum.key,
                Description: boxNum.Description,
                LockerId: boxNum.LockerId,
                BoxType: boxNum.BoxType,
                Code: boxNum.Code,
                IsFake: boxNum.IsFake,
                BoxSize: boxSize,
                FromTop: boxNum.FromTop,
                FromLeft: boxNum.FromLeft,
              };
            } else {
              if (e.Code === boxNum.Code) {
                let checkOversize = false;
                for (let i = 0; i < boxOversize.length; i++) {
                  if (
                    boxOversize[i].FromTop == e.FromTop &&
                    boxOversize[i].FromLeft == e.FromLeft
                  ) {
                    checkOversize = true;
                  } else checkOversize = false;
                }
                if (!checkOversize) {
                  return {
                    id: index1,
                    key: i,
                    Description: 'Box ' + index1,
                    LockerId: 1,
                    BoxType: boxType1,
                    Code: 'Box ' + index1,
                    IsFake: false,
                    BoxSize: boxSize1,
                    FromTop: top,
                    FromLeft: left,
                  };
                }
              } else {
                return e;
              }
            }
          });

          setGridData((preState) => ({
            ...preState,
            box: fakeGrid ?? [],
          }));

          let count = 0;
          const newBoxList = [];

          const pushBoxData = fakeGrid.map((e, i) => {
            if (!e.IsFake) {
              newBoxList.push(e);
            }
          });

          setData((preState) => ({
            ...preState,
            box: newBoxList ?? [],
          }));
        }
      }
    },
  });

  function resetGrid() {
    const rowNum = data.row;
    const colNum = data.col;
    const total = rowNum * colNum;
    const fakeData = new Array(total).fill().map((_, box) => box);

    let left = 0;
    let top = 1;
    const newBox = fakeData.map((e, i) => {
      if (left == colNum) {
        left = 1;
        top++;
      } else left++;
      const index1 = i + 1;
      return {
        id: index1,
        key: i,
        Description: '',
        LockerId: 1,
        BoxType: boxType1,
        Code: 'Box ' + index1,
        IsFake: false,
        BoxSize: boxSize1,
        FromTop: top,
        FromLeft: left,
      };
    });
    setData((preState) => ({
      ...preState,
      box: newBox ?? [],
    }));
    setGridData((preState) => ({
      ...preState,
      row: rowNum,
      col: colNum,
      gridAmount: newBox.length,
      box: newBox ?? [],
    }));
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (data.name !== '' && data.row > 0 && data.col > 0) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [notify, setNotify] = React.useState({
    isOpen: false,
    msg: '',
    type: 'info',
  });

  const handleNotifyClick = () => {
    setNotify((preState) => ({ ...preState, isOpen: true }));
  };

  const handleNotifyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify((preState) => ({ ...preState, isOpen: false }));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleNotifyClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );
  if (data.name !== '' && data.row > 0 && data.col > 0 && createButton) {
    handleClickOpen();
    setCreateButton(false);
  }
  function createNewLocker() {
    createLocker(data)
      .then((res) => {
        if (res.status == 201) {
          navigate('/admin/locker', {
            state: {
              notify: {
                isOpen: true,
                msg: 'Create locker successfully',
                type: 'success',
              },
            },
          });
        } else {
          setNotify((preState) => ({
            ...preState,
            isOpen: true,
            msg: 'Create locker fail',
            type: 'error',
          }));
        }
      })
      .catch((err) => {
        setNotify((preState) => ({
          ...preState,
          isOpen: true,
          msg: 'Create locker fail',
          type: 'error',
        }));
      });
  }

  return (
    <Box sx={{ p: '5%' }}>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: '700' }}>
            New Locker
          </Typography>
          {/* <Button
            type='submit'
            variant='contained'
            // onClick={() => navigate('/admin/new-store', { replace: true })}
          >
            Create new locker
          </Button> */}
        </Box>
        <Box>
          <Paper
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // gap: 2,
              padding: '2rem 3rem',
            }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />{' '}
              <TextField
                margin='normal'
                fullWidth
                id='description'
                label='Description'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  margin='normal'
                  required
                  id='row'
                  label='Row'
                  value={formik.values.row}
                  style={{ width: '45%' }}
                  onChange={formik.handleChange}
                  error={formik.touched.row && Boolean(formik.errors.row)}
                  helperText={formik.touched.row && formik.errors.row}
                />
                <TextField
                  margin='normal'
                  required
                  label='Col'
                  id='col'
                  style={{ width: '45%' }}
                  value={formik.values.col}
                  onChange={formik.handleChange}
                  error={formik.touched.col && Boolean(formik.errors.col)}
                  helperText={formik.touched.col && formik.errors.col}
                />
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={formik.values.isPattern} />}
                  label='Use this as layout for other locker'
                  id='isPattern'
                  name='isPattern'
                  onChange={formik.handleChange}
                />
              </Box>
              <Box>
                {boxClick ? (
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        // gap: 1,
                        textAlign: 'center',
                        border: '1px solid #D3D3D3',
                        borderRadius: '5px',
                        padding: '1rem',
                      }}
                    >
                      <Typography
                        variant='body1'
                        sx={{
                          borderRight: '2px solid #D3D3D3',
                          paddingRight: '0.75rem',
                        }}
                      >
                        <Box component='span' fontWeight='bold'>
                          Box name:
                        </Box>{' '}
                        {boxNum.Code}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          borderRight: '2px solid #D3D3D3',
                          padding: '0 0.75rem',
                        }}
                      >
                        <Box component='span' fontWeight='bold'>
                          From top (x axis):
                        </Box>{' '}
                        {boxNum.FromTop}
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          paddingLeft: '0.75rem',
                        }}
                      >
                        <Box component='span' fontWeight='bold'>
                          From left (y axis):
                        </Box>{' '}
                        {boxNum.FromLeft}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Autocomplete
                        id='boxNum'
                        name='boxNum'
                        options={data.box}
                        getOptionLabel={(option) => option.Code}
                        value={boxNum}
                        disableClearable
                        style={{ width: '30%' }}
                        onChange={(e, value) => {
                          setBoxNum(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin='normal'
                            label='Box name'
                            // fullWidth
                            name='boxNum'
                            {...params}
                          />
                        )}
                      />
                      <Autocomplete
                        id='boxSize'
                        name='boxSize'
                        options={boxSizeList}
                        getOptionLabel={(option) => option.description}
                        value={boxSize}
                        disableClearable
                        style={{ width: '25%' }}
                        onChange={(e, value) => {
                          setBoxSize(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin='normal'
                            label='Box size'
                            // fullWidth
                            name='boxSize'
                            {...params}
                          />
                        )}
                      />
                      <Autocomplete
                        id='boxType'
                        name='boxType'
                        options={boxTypeList}
                        getOptionLabel={(option) => option.name}
                        value={boxType}
                        disableClearable
                        style={{ width: '40%' }}
                        onChange={(e, value) => {
                          setBoxType(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            margin='normal'
                            label='Box Type'
                            // fullWidth
                            name='boxType'
                            {...params}
                          />
                        )}
                      />
                    </Box>
                    <TextField
                      margin='normal'
                      // required
                      fullWidth
                      label='Box description'
                      id='boxDescription'
                      value={formik.values.boxDescription}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.boxDescription &&
                        Boolean(formik.errors.boxDescription)
                      }
                      helperText={
                        formik.touched.boxDescription &&
                        formik.errors.boxDescription
                      }
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{ marginLeft: 1 }}
                >
                  Preview
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={resetGrid}
                  sx={{ marginLeft: 1 }}
                >
                  Reset grid
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  onClick={() => setCreateButton(true)}
                  sx={{ marginLeft: 1 }}
                >
                  Create Locker
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: '45%' }}>
              <Box
                id='grid'
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${data.col}, 1fr)`,
                  gap: 1,
                }}
              >
                {data.box &&
                  data.box?.map((e, i) => (
                    <Item
                      className='grid-item'
                      sx={{
                        gridRow: `span ${e.BoxSize.height}`,
                        gridColumn: `span ${e.BoxSize.length}`,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setBoxClick(true);
                        setBoxNum(e);
                        setBoxSize(e.BoxSize);
                        setBoxType(e.BoxType);
                      }}
                    >
                      {e.Code}
                    </Item>
                  ))}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Confirm create locker'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please check locker's information is correct
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              createNewLocker();
              handleClose();
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={handleNotifyClose}
        action={action}
        variant={notify.type}
      >
        <Alert
          severity={notify.type}
          onClose={handleNotifyClose}
          autoHideDuration={3000}
        >
          {notify.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default index;

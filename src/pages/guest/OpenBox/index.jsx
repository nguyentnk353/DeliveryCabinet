import { useMount } from 'ahooks';
import React, { useState } from 'react';
import getLockerIdGuest from '../../../services/getLockerIdGuest';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { blue, yellow } from '@mui/material/colors';
import * as yup from 'yup';
import { useFormik } from 'formik';
import postOpenBox from '../../../services/postOpenBox';
import useNotification from '../../../utils/useNotification';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderModal from './components/OrderModal';
import Footer from './../../../components/Footer/index';
import CustomerHeader02 from '../../../components/CustomerHeader02/CustomerHeader02';

const validationSchema = yup.object({
  code: yup
    .string()
    .required('Mã không được để trống')
    .matches(/^[0-9]+$/, 'Mã phải là 4 số')
    .min(4, 'Mã phải chính xác 4 số')
    .max(4, 'Mã phải chính xác 4 số'),
});

const index = () => {
  const navigate = useNavigate();
  const lockerId = location.href.substring(location.href.lastIndexOf('/') + 1);
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  const count = parseInt(localStorage.getItem('countCode'));
  const [left, setLeft] = useState(3 - count);
  const [open, setOpen] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [box, setBox] = useState({});
  const [locker, setLocker] = useState({});
  const [msg, sendNotification] = useNotification();
  const [dialogTitle, setDialogTitle] = useState('');
  const [alert, setAlert] = useState(false);

  useMount(() => {
    if (!count) {
      localStorage.setItem('countCode', 0);
    }
    const api = {
      id: lockerId,
    };
    getLockerIdGuest(api)
      .then((res) => {
        if (res.status == 200) {
          const resData = res.data.items.map((e) => e);
          setLocker(resData[0]);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    const api = {
      id: lockerId,
    };
    getLockerIdGuest(api)
      .then((res) => {
        if (res.status == 200) {
          const resData = res.data.items.map((e) => e);
          setLocker(resData[0]);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }, [sendNotification, dialogTitle]);
  // useEffect(() => {
  //   console.log('Count' + count);
  // }, [count]);
  function colorStatus(s) {
    switch (s) {
      case 0:
        return {
          label: 'Hủy',
          color: '#e26e2a',
          bgcolor: '#fdf4f3',
        };

      case 1:
        return {
          label: 'Trống',
          color: '#1bcd7a',
          bgcolor: '#e5fceb',
        };
      case 2:
        return {
          label: 'Đang thuê',
          color: '#2196f3',
          bgcolor: '#e3f2fd',
        };
      case 3:
        return {
          label: 'Quá hạn',
          color: '#ff5722',
          bgcolor: '#ffccbc',
        };
      case 4:
        return {
          label: 'Khóa',
          color: '#ff5722',
          bgcolor: '#ffccbc',
        };
      default:
        return {
          label: 'unknow status',
          color: '#212121',
          bgcolor: '#f5f5f5',
        };
    }
  }

  const handleWrongBox = (b) => {
    if (b.status == 2) {
      handleOpen();
    } else if (b.status == 1) {
      // console.log('box empty');
      setDialogTitle('Tủ này không được mở');
      handleOpenD();
      // setOpenOrder(true);
    } else {
      setDialogTitle('Tủ này không được mở');
      handleOpenD();
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAlert(false);
    formik.resetForm({
      values: {
        code: '',
      },
    });
    setOpen(false);
  };
  const handleOpenD = (s) => {
    setAlert(false);
    setOpenD(true);
  };
  const handleCloseD = () => {
    setAlert(false);
    setDialogTitle('');
    setOpenD(false);
  };
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
    p: '1.5rem 1rem',
  };

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const checkOpenCode = box.openCode == val.code;
      if (checkOpenCode) {
        const payload = {
          boxid: box.id,
          ActionType: 1,
        };
        postOpenBox(payload)
          .then((res) => {
            setAlert(false);
            handleClose();
            if (res.status == 201) {
              setDialogTitle('Tủ này đã được mở');
              handleOpenD();
              localStorage.setItem('countCode', 0);
              sendNotification({
                msg: `Box #${box.id} open success`,
                variant: 'success',
              });
            } else {
              setDialogTitle('Tủ này không mở được');
              sendNotification({
                msg: `Box #${box.id} open fail`,
                variant: 'error',
              });
            }
          })
          .catch((err) => console.log(err));
      } else if (count > 2) {
        setAlert(false);
        setDialogTitle(
          'Tủ này đã bị khóa sau 4 lần nhập sai, hay liên lạc với người phụ trách để lấy lại đồ dùng trong tủ'
        );
        handleOpenD();
        handleClose();
        const api = {
          boxid: box.id,
          ActionType: 3,
        };
        postOpenBox(api)
          .then((res) => {
            if (res.status == 201) {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
        localStorage.setItem('countCode', 0);
      } else if (!checkOpenCode && count < 4) {
        setAlert(true);
        setLeft(3 - count);
        localStorage.setItem('countCode', count + 1);
      } else {
        // console.log(count);
      }

      // const api = {
      //   openCode: val.code,
      // };
      // createBoxType(api)
      //   .then((res) => {
      //     if (res.status == 201) {
      //       sendNotification({
      //         msg: 'Box type create success',
      //         variant: 'success',
      //       });
      //       setCreateSuccess(true);
      //     } else {
      //       sendNotification({ msg: 'Box type create fail', variant: 'error' });
      //     }
      //     handleClose();
      //   })
      //   .catch((err) => {
      //     sendNotification({ msg: err, variant: 'error' });
      //   });
    },
  });

  return (
    <Box>
      <OrderModal open={openOrder} setOpen={setOpenOrder} box={box} />
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleCloseD}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
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
            <Box sx={{ padding: '1rem' }}>
              <Typography variant='body1'>Bạn chỉ có 4 lần nhập *</Typography>
              {alert && (
                <Alert severity='warning'>
                  Sai mã mở tủ .Số lần nhập còn lại: {left}
                </Alert>
              )}
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
      <CustomerHeader02 />
      <Box
        sx={{
          backgroundColor: '#fafafafa',
          padding: '2rem 0',
          minHeight: '100vh',
        }}
      >
        <Paper
          sx={{
            // width: '90%',
            maxWidth: '338px',
            padding: '1rem 1rem 2rem 1rem',
            margin: 'auto',
          }}
        >
          <Box>
            <Typography variant='h6'>{locker?.name}</Typography>
            <Typography
              variant='body2'
              sx={{ marginBottom: '1rem', fontWeight: '600' }}
            >
              Địa chỉ :{' '}
              <Typography
                display='inline'
                variant='caption'
                sx={{ opacity: '80%' }}
              >
                {locker?.store?.address}
              </Typography>
            </Typography>
            {/* <Button
              onClick={(c) => {
                c.stopPropagation();
                localStorage.setItem('countCode', 0);
              }}
            >
              reset local
            </Button> */}
          </Box>
          <div
            id='grid'
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${locker.col}, 1fr)`,
              gridTemplateRows: `repeat(${locker.row}, 1fr)`,
              gridGap: '8px',
            }}
          >
            {locker?.boxes &&
              locker?.boxes?.map((e, i) => {
                const stat = colorStatus(e.status);
                return (
                  <Paper
                    className='grid-item'
                    sx={{
                      gridRow: `span ${e.boxSize.height}`,
                      gridColumn: `span ${e.boxSize.length}`,
                      cursor: 'pointer',
                      backgroundColor: yellow[100],
                      textAlign: 'center',
                      // paddingBottom: '60%',
                      // paddingTop: '10%',
                      padding: '10%',
                      border: '3px solid',
                      // display: 'flex',
                      // flexDirection: 'column',
                      // justifyContent: 'space-between',
                      // gap: '2rem',
                    }}
                    onClick={(c) => {
                      // c.stopPropagation();
                      setBox(e);
                      handleWrongBox(e);
                    }}
                  >
                    <div>{e.code}</div>
                    {/* <Chip
                      sx={{
                        //  paddingTop: '50%',
                        color: stat.color,
                        bgcolor: stat.bgcolor,
                      }}
                      label={stat.label}
                    /> */}

                    <div
                      style={{
                        color: stat.color,
                        backgroundColor: stat.bgcolor,
                        width: 'fit-content',
                      }}
                      className='m-auto p-[5px] rounded-lg md:mt-10 max-md:mt-2'
                    >
                      {stat.label}
                    </div>
                  </Paper>
                );
              })}
          </div>
        </Paper>
      </Box>
      <Footer />
    </Box>
  );
};

export default index;

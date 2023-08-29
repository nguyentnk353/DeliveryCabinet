import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Divider,
  Chip,
  useTheme,
  IconButton,
  // Modal,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import { DeleteForever, Edit, MoreVert } from '@mui/icons-material';
import getBoxTypeList from './../../../../services/getBoxTypeList';
import useNotification from '../../../../utils/useNotification';
import { blue, red } from '@mui/material/colors';
import deleteBoxType from './../../../../services/deleteBoxType';
import { useFormik } from 'formik';
import * as yup from 'yup';
import updateBoxType from './../../../../services/updateBoxType';
import getPriceTableList from './../../../../services/getPriceTableList';
import moment from 'moment-timezone';
import deletePriceTable from './../../../../services/deletePriceTable';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import updatePriceTable from './../../../../services/updatePriceTable';
import { useNavigate } from 'react-router-dom';
import { DatePicker, Space, Modal, Empty } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import ModalPriceTable from './ModalPriceTable';

const validationSchema = yup.object({
  name: yup.string('Enter box size name').required('Name is required'),
});

const PriceTableTable = ({ searchText, createSuccess, isEnable }) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [msg, sendNotification] = useNotification();
  const [picker, setPicker] = useState([]);
  const navigate = useNavigate();
  function handleChangePage(event, newpage) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  const [table, setTable] = useState([]);
  const [tableTotal, setTableTotal] = useState(0);

  useMount(() => {
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getPriceTableList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
      })
      .catch((err) => {
        console.log({ msg: err, variant: 'error' });
      });
  });
  useEffect(() => {
    const api = {
      Name: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
    };
    getPriceTableList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
        createSuccess = false;
      })
      .catch((err) => {
        console.log({ msg: err, variant: 'error' });
      });
  }, [createSuccess, pg, rpg, searchText, msg]);

  const [open, setOpen] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [priceId, setPriceId] = React.useState(null);
  const handleOpenPrice = (id) => {
    setPriceId(id);
    setOpenPrice(true);
  };
  const handleClosePrice = () => {
    setOpenPrice(false);
  };
  const [field, setField] = React.useState({
    id: '',
    name: '',
    status: true,
    rangePicker: [],
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        name: '',
        status: '',
        rangePicker: null,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: field,
    validationSchema: validationSchema,
    onSubmit: (val) => {
      const bi = [0, 0, 0, 0, 0, 0, 0];
      if (val.mon === true) bi[0] = 1;
      else bi[0] = 0;
      if (val.tue === true) bi[1] = 1;
      else bi[1] = 0;
      if (val.wed === true) bi[2] = 1;
      else bi[2] = 0;
      if (val.thu === true) bi[3] = 1;
      else bi[3] = 0;
      if (val.fri === true) bi[4] = 1;
      else bi[4] = 0;
      if (val.sat === true) bi[5] = 1;
      else bi[5] = 0;
      if (val.sun === true) bi[6] = 1;
      else bi[6] = 0;

      const api = {
        id: field.id,
        name: val.name,
        applyFrom: dayjs(val.rangePicker[0].$d).format('YYYY-MM-DDTHH:mm[Z]'),
        applyTo: dayjs(val.rangePicker[1].$d).format('YYYY-MM-DDTHH:mm[Z]'),
        dateFilter: bi.join(''),
        isEnable: val.status,
      };

      updatePriceTable(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Price table update success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Price table update fail',
              variant: 'error',
            });
          }
          handleClose();
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });

  function openUpdate(row) {
    const b = row?.dateFilter?.split('').map(Number);
    setField({
      id: row?.id,
      name: row?.name,
      status: row?.isEnable,
      rangePicker: [dayjs(row?.applyFrom), dayjs(row?.applyTo)],
      mon: b[0] == 1,
      tue: b[1] == 1,
      wed: b[2] == 1,
      thu: b[3] == 1,
      fri: b[4] == 1,
      sat: b[5] == 1,
      sun: b[6] == 1,
    });
    setOpen(true);
  }
  function apiDelete(id) {
    deletePriceTable(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Price table delete success',
            variant: 'success',
          });
        } else {
          sendNotification({
            msg: 'Price table delete fail',
            variant: 'error',
          });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }

  function showDateFilter(date) {
    const b = date?.split('').map(Number);
    const tf = b?.map((e) => {
      if (e == 1) {
        return true;
      } else {
        return false;
      }
    });
    const check = tf?.map((e, i) => {
      let d = i + 2;
      if (d == 8) d = 'Sun';
      if (i == 2) {
        return (
          <>
            <FormControlLabel
              disabled
              control={<Checkbox checked={e} />}
              label={d}
            />
            <br />
          </>
        );
      } else {
        return (
          <FormControlLabel
            disabled
            control={<Checkbox checked={e} />}
            label={d}
          />
        );
      }
    });

    return check;
  }
  return (
    <Box>
      <ModalPriceTable
        open={openPrice}
        setOpen={setOpenPrice}
        priceId={priceId}
      />
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          footer={null}
          closable={false}
          width={600}
        >
          <Box>
            <Typography
              id='modal-modal-title'
              variant='h5'
              component='h2'
              textAlign='center'
              fontWeight='bold'
              color={blue[500]}
            >
              UPDATE PRICE TABLE
            </Typography>
            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ padding: '0 4rem 1rem 4rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <TextField
                    margin='normal'
                    sx={{ width: '260px' }}
                    required
                    id='name'
                    label='Name'
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <Box sx={{ width: '130px', paddingTop: '1.5%' }}>
                    <FormControl fullWidth>
                      <InputLabel id='statusLabel'>Status</InputLabel>
                      <Select
                        labelId='statusLabel'
                        id='status'
                        label='Status'
                        value={formik.values.status}
                        onChange={(e) => {
                          formik.setFieldValue('status', e.target.value);
                        }}
                      >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box sx={{ marginBottom: '1rem' }}>
                  <RangePicker
                    size='large'
                    // value={picker}
                    // onChange={(value) => {
                    //   setPicker(value);
                    // }}
                    value={
                      formik?.values?.rangePicker
                        ? formik?.values?.rangePicker
                        : [dayjs('2023/08/29'), dayjs('2023/08/29')]
                    }
                    // defaultValue={field?.rangePicker}
                    // defaultPickerValue={formik?.values.rangePicker}
                    onChange={(value) => {
                      formik.setFieldValue('rangePicker', value);
                    }}
                    style={{
                      zIndex: 10,
                      padding: '0.75rem 1rem',
                      width: '410px',
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant='body1' fontWeight='bold'>
                    Date apply *
                  </Typography>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.mon} />}
                      label='2'
                      name='mon'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.tue} />}
                      label='3'
                      name='tue'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.wed} />}
                      label='4'
                      name='wed'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.thu} />}
                      label='5'
                      name='thu'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.fri} />}
                      label='6'
                      name='fri'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.sat} />}
                      label='7'
                      name='sat'
                      onChange={formik.handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formik.values.sun} />}
                      label='Sun'
                      name='sun'
                      onChange={formik.handleChange}
                    />
                  </Box>
                </Box>
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
                <Button variant='outlined' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Service type</TableCell>
              <TableCell>Apply from</TableCell>
              <TableCell>Apply to</TableCell>
              <TableCell>Date apply</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((row) => (
              <TableRow
                key={row?.id}
                sx={{
                  '&:last-child td,&:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => handleOpenPrice(row.id)}
              >
                <TableCell component='th' scope='row'>
                  {row?.id}
                </TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>
                  {row?.serviceConfigs.map((e) => (
                    <Chip
                      label={e?.serviceType?.name}
                      size='small'
                      variant='outlined'
                    />
                  ))}
                </TableCell>
                <TableCell>
                  {moment(row?.applyFrom).format('DD /MM /YYYY')}
                </TableCell>
                <TableCell>
                  {moment(row?.applyTo).format('DD /MM /YYYY')}
                </TableCell>
                <TableCell>{showDateFilter(row?.dateFilter)}</TableCell>
                <TableCell>
                  {row?.isEnable ? (
                    <Chip
                      label='Active'
                      size='small'
                      sx={{
                        color: '#1bcd7a',
                        bgcolor: '#e5fceb',
                      }}
                    />
                  ) : (
                    <Chip
                      label='Inactive'
                      size='small'
                      sx={{
                        color: '#e26e2a',
                        bgcolor: '#fdf4f3',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdate(row);
                      }}
                    >
                      <Edit sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        apiDelete(row.id);
                      }}
                    >
                      <DeleteForever sx={{ color: red[600] }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {table.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Empty />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={tableTotal}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PriceTableTable;

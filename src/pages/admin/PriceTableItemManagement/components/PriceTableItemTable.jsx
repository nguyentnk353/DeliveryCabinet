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
  Modal,
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
import useNotification from '../../../../utils/useNotification';
import { blue, red } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment-timezone';
import deletePriceTable from '../../../../services/deletePriceTable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import updatePriceTable from '../../../../services/updatePriceTable';
import getPriceTableItemList from './../../../../services/getPriceTableItemList';
import { useLocation } from 'react-router-dom';
import updatePriceTableItem from './../../../../services/updatePriceTableItem';
import deletePriceTableItem from './../../../../services/deletePriceTableItem';

moment.tz.setDefault('America/Los_Angeles');

const validationSchema = yup.object({});

const PriceTableItemTable = ({ searchText, createSuccess, isEnable }) => {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [msg, sendNotification] = useNotification();
  const location = useLocation();

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
      search: searchText,
      PageIndex: pg + 1,
      PageSize: rpg,
      IsEnable: isEnable,
      PriceTableId: location?.state?.priceTable?.id,
    };
    getPriceTableItemList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  });

  useEffect(() => {
    const api = searchText
      ? {
          search: searchText,
          PageIndex: 1,
          PageSize: rpg,
          IsEnable: isEnable,
          PriceTableId: location?.state?.priceTable?.id,
        }
      : {
          search: searchText,
          PageIndex: pg + 1,
          PageSize: rpg,
          IsEnable: isEnable,
          PriceTableId: location?.state?.priceTable?.id,
        };
    getPriceTableItemList(api)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setTable(newTable);
        setTableTotal(res.totalRecord);
        createSuccess = false;
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }, [createSuccess, pg, rpg, searchText, msg]);

  const [open, setOpen] = React.useState(false);

  const [field, setField] = React.useState({
    id: '',
    minDuration: 0,
    maxDuration: 0,
    unitPrice: 0,
    description: 0,
    isEnable: '',
    priceTableId: '',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({
      values: {
        id: '',
        minDuration: 0,
        maxDuration: 0,
        unitPrice: 0,
        description: 0,
        isEnable: '',
        priceTableId: '',
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
      const api = {
        id: field.id,
        minDuration: val.minDuration,
        maxDuration: val.maxDuration,
        unitPrice: val.unitPrice,
        description: val.description,
        isEnable: val.isEnable,
        priceTableId: field.priceTableId,
      };
      updatePriceTableItem(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Price table items update success',
              variant: 'success',
            });
          } else {
            sendNotification({
              msg: 'Price table items update fail',
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
    setField({
      id: row.id,
      minDuration: row.minDuration,
      maxDuration: row.maxDuration,
      unitPrice: row.unitPrice,
      description: row.description,
      isEnable: row.isEnable,
      priceTableId: location?.state?.priceTable?.id,
    });
    setOpen(true);
  }
  function apiDelete(id) {
    deletePriceTableItem(id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Price table items delete success',
            variant: 'success',
          });
        } else {
          sendNotification({
            msg: 'Price table items delete fail',
            variant: 'error',
          });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }

  return (
    <Box>
      <Box>
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
              UPDATE PRICE TABLE
            </Typography>
            <Box
              component='form'
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Box sx={{ padding: '2rem' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    id='minDuration'
                    label='Min duration'
                    autoFocus
                    value={formik.values.minDuration}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.minDuration &&
                      Boolean(formik.errors.minDuration)
                    }
                    helperText={
                      formik.touched.minDuration && formik.errors.minDuration
                    }
                  />
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    id='maxDuration'
                    label='Max duration'
                    value={formik.values.maxDuration}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.maxDuration &&
                      Boolean(formik.errors.maxDuration)
                    }
                    helperText={
                      formik.touched.maxDuration && formik.errors.maxDuration
                    }
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    id='unitPrice'
                    label='Unit price'
                    value={formik.values.unitPrice}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.unitPrice &&
                      Boolean(formik.errors.unitPrice)
                    }
                    helperText={
                      formik.touched.unitPrice && formik.errors.unitPrice
                    }
                  />
                  <Box sx={{ width: '100%', paddingTop: '2.5%' }}>
                    <FormControl fullWidth>
                      <InputLabel id='statusLabel'>Status</InputLabel>
                      <Select
                        labelId='statusLabel'
                        id='isEnable'
                        label='Status'
                        value={formik.values.isEnable}
                        onChange={(e) => {
                          formik.setFieldValue('isEnable', e.target.value);
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
              <TableCell>Min duration</TableCell>
              <TableCell>Max duration</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td,&:last-child th': { border: 0 },
                }}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell>{row.minDuration}</TableCell>
                <TableCell>{row.maxDuration}</TableCell>
                <TableCell>{row.unitPrice}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  {row.isEnable ? (
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

export default PriceTableItemTable;

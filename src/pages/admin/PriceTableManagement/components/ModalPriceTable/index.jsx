import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import getPriceTableItemList from '../../../../../services/getPriceTableItemList';

const index = ({ open, setOpen, priceId }) => {
  const [priceTable, setPriceTable] = useState([]);

  useEffect(() => {
    setPriceTable([]);
    const payloadPrice = {
      IsEnable: true,
      PriceTableId: priceId,
    };
    getPriceTableItemList(payloadPrice)
      .then((res) => {
        const newTable = res.items.map((e) => e);
        setPriceTable(newTable);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [priceId]);
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
  };
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
          PRICE TABLE
        </Typography>
        <Box sx={{ padding: '1rem 2rem 0 2rem' }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 350 }}
              size='small'
              aria-label='simple table'
            >
              <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                <TableRow>
                  <TableCell>Box size</TableCell>
                  <TableCell>Box type</TableCell>
                  <TableCell>Duration (minute)</TableCell>
                  <TableCell>Price (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceTable.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{
                      '&:last-child td,&:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {row?.boxSize?.length} x {row?.boxSize?.height}
                    </TableCell>
                    <TableCell>{row?.boxType?.name}</TableCell>
                    <TableCell>
                      {row?.minDuration} -{' '}
                      {row.maxDuration === null ? 'Onwards' : row?.maxDuration}
                    </TableCell>
                    <TableCell>{row?.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ textAlign: 'right', marginTop: '1rem' }}>
            <Button variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default index;

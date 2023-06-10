import { MoreVert } from '@mui/icons-material';
import {
    Box,
    Chip,
    Divider,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import getAreaList from '../../../../../services/getAreaList';

const TableAreaList = ({status, search}) => {

    const [table, setTable] = useState([]);
    const [page, setPage] = useState(0);
    const [rpg, setrpg] = React.useState(5);
    const [row, setRow] = useState();

    function handleChangePage(e, newpage) {
        setPage(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setPage(0);
    }

    useMount(() => {
        const payload = {
            PageIndex: page + 1,
            PageSize: rpg,
            IsEnable: status,
          };
          getAreaList(payload)
          .then((res) => {
              const newTable = res.items.map((e) => e);
              setTable(newTable);
              setRow(res.totalRecord)
          })
          .catch((err) => {
              console.log(err);
          });  
    });

    useEffect(() => {
        const payload = {
            PageIndex: page + 1,
            PageSize: rpg,
            search: search,
            IsEnable: status,
          };
        getAreaList(payload)
            .then((res) => {
                const newTable = res.items.map((e) => e);
                setTable(newTable);
                setRow(res.totalRecord)
            })
            .catch((err) => {
                console.log(err);
            });
      }, [page, rpg, search]);
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
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
                                <TableCell>{row.name}</TableCell>
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
                                    <IconButton>
                                        <MoreVert />
                                    </IconButton>
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
                count={row}
                rowsPerPage={rpg}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

export default TableAreaList
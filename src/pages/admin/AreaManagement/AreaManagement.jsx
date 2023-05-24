import { MoreVert, SearchOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMount } from 'ahooks';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAreaList from '../../../services/getAreaList';
import AddArea from '../components/AddArea/AddArea';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function createData(name, dsa, maths, dbms, networking) {
    return { name, dsa, maths, dbms, networking };
}

const rows = [
    createData('John', 80, 66, 76, 89),
    createData('Sandeep', 82, 83, 79, 98),
    createData('Raman', 85, 79, 80, 85),
    createData('Saini', 75, 67, 85, 78),
    createData('Virat', 90, 89, 84, 76),
    createData('Rohit', 86, 83, 95, 88),
    createData('Smriti', 92, 90, 89, 80),
    createData('Mandhana', 86, 88, 88, 89),
    createData('Deepti', 79, 86, 80, 88),
];

const AreaManagement = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    const [table, setTable] = useState([]);

    useMount(() => {
        getAreaList()
            .then((res) => {
                const newTable = res.items.map((e) => e);
                setTable(newTable);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const handleModalOpen = () => {
        setShowModal(true);
      };
    
      const handleModalClose = () => {
        setShowModal(false);
      };

    return (
        <Box sx={{ p: '5%' }}>
            <Box sx={{
                marginBottom: '2rem',
            }}>
                <Grid container spacing={23} columns={16}>
                    <Grid item xs={12}>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                            Area List
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained"  onClick={handleModalOpen}>Add New Area</Button>
                        <AddArea showModal={showModal} onClose={handleModalClose} />
                        {/* <Alert severity="success">Create Seccessfully — check it out!</Alert> */}
                    </Grid>
                </Grid>
            </Box>

            <Paper sx={{ borderRadius: '16px' }}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: '#f4f6f8',
                        borderRadius: '16px 16px 0 0',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                    >
                        <Tab label='All' {...a11yProps(0)} />
                        <Tab label='Active' {...a11yProps(1)} />
                        <Tab label='Inactive' {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Box
                    sx={{
                        p: '2%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <TextField
                        id='search-store-type'
                        placeholder='Search...'
                        type='search'
                        variant='outlined'
                        sx={{
                            width: '45%',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <TabPanel value={value} index={0}>
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
                            count={rows.length}
                            rowsPerPage={rpg}
                            page={pg}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box>Table 2</Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box>Table 3</Box>
                </TabPanel>
            </Paper>

        </Box>
    );
};

export default AreaManagement;
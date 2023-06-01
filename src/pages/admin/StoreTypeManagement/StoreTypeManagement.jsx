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
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMount } from 'ahooks';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getStoreTypeList from '../../../services/getStoreTypeList';
import AddStoreType from '../components/AddStoreType/AddStoreType';
import TableStoreType from './components/TableStoreType';

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

const StoreTypeManagement = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Grid container spacing={22} columns={16}>
                    <Grid item xs={12}>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                            Store Type List
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Button variant="contained"  onClick={handleModalOpen}>Add Store Type</Button>
                        <AddStoreType showModal={showModal} onClose={handleModalClose} />
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
                    <Box><TableStoreType /></Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box><TableStoreType status={true} /></Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box><TableStoreType status={false} /></Box>
                </TabPanel>
            </Paper>

        </Box>
    );
};

export default StoreTypeManagement;
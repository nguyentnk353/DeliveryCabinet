import { SearchOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    InputAdornment,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddArea from '../components/AddArea/AddArea';
import TableAreaList from './components/AreaTable/TableAreaList';


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

const AreaManagement = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState('');

    console.log("123456789")
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
                <Grid container spacing={23} columns={16}>
                    <Grid item xs={12}>
                        <Typography variant='h5' sx={{ fontWeight: '700' }}>
                            Area List
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={handleModalOpen}>Add New Area</Button>
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
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
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
                    <Box><TableAreaList search={searchText}/></Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box><TableAreaList status={true} search={searchText}/></Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box><TableAreaList status={false} search={searchText}/></Box>
                </TabPanel>
            </Paper>

        </Box>
    );
};

export default AreaManagement;
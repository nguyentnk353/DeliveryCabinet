import React from 'react';
import CustomBreadcrumb from '../../../components/CustomBreadcrumb';
import { Box, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import BoxSizeTable from './components/BoxSzieTable/BoxSizeTable';
import BoxTypeTable from './components/BoxTypeTable/BoxTypeTable';

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

TabPanel.PropTypes = {
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
const index = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const bcList = [
    {
      name: 'Box config',
      sidebar: 'Box config',
      to: '/admin/box-config',
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant='h5'
            sx={{ fontWeight: '600', marginBottom: '0.25rem' }}
          >
            Box config
          </Typography>
          <Box>
            <CustomBreadcrumb list={bcList} />
          </Box>
        </Box>
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
            <Tab label='Box size' {...a11yProps(0)} />
            <Tab label='Box type' {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {/* <TableAreaList status='' search='' /> */}
          <BoxSizeTable createSuccess='' isEnable='' />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <TableStoreType status='' search='' /> */}
          <BoxTypeTable createSuccess='' isEnable='' />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default index;

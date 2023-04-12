import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

const index = () => {
  return (
    <Box sx={{ p: '5%' }}>
      <Paper sx={{ p: '2%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>Store management</Typography>
          <Button variant='contained'>Create new store</Button>
        </Box>
        <Box>Table</Box>
      </Paper>
    </Box>
  );
};

export default index;

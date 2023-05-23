import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

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
          <Typography variant='h6'>Account management</Typography>
          <Button variant='contained'>Create new account</Button>
        </Box>
        <Box>Table</Box>
      </Paper>
    </Box>
  );
};

export default index;

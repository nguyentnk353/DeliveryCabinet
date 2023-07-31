import { FmdGoodOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mColor = theme.palette.primary.main;
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <Typography variant='h5' fontWeight='bold'>
          Config
        </Typography>
        {/* <Button variant='contained' onClick={handleOpen}>
          + New box type
        </Button> */}
      </Box>
      <Paper sx={{ borderRadius: '16px', padding: '2% 4%' }}>
        <Box>
          <Typography variant='h6' fontWeight='bold'>
            Store
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                border: `2px solid ${mColor}`,
                borderRadius: '7px',
                width: '180px',
                height: '60px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: mColor,
                ':hover': {
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: mColor,
                },
              }}
              onClick={() => navigate('/admin/area', { replace: true })}
            >
              <FmdGoodOutlined />
              Area
            </Box>
            <Box
              sx={{
                border: `2px solid ${mColor}`,
                borderRadius: '7px',
                width: '180px',
                height: '60px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: mColor,
                ':hover': {
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: mColor,
                },
              }}
              onClick={() => navigate('/admin/store-type', { replace: true })}
            >
              <FmdGoodOutlined />
              Store type
            </Box>
            <Box
              sx={{
                border: `2px solid ${mColor}`,
                borderRadius: '7px',
                width: '180px',
                height: '60px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: mColor,
                ':hover': {
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: mColor,
                },
              }}
              onClick={() => navigate('/admin/service-type', { replace: true })}
            >
              <FmdGoodOutlined />
              Service type
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant='h6' fontWeight='bold'>
            Box
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                border: `2px solid ${mColor}`,
                borderRadius: '7px',
                width: '180px',
                height: '60px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: mColor,
                ':hover': {
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: mColor,
                },
              }}
              onClick={() => navigate('/admin/box-size', { replace: true })}
            >
              <FmdGoodOutlined />
              Box size
            </Box>
            <Box
              sx={{
                border: `2px solid ${mColor}`,
                borderRadius: '7px',
                width: '180px',
                height: '60px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: mColor,
                ':hover': {
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: mColor,
                },
              }}
              onClick={() => navigate('/admin/box-type', { replace: true })}
            >
              <FmdGoodOutlined />
              Box type
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default index;

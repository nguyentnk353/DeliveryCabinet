import { FiberManualRecord } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const index = ({ item, toggle }) => {
  const selected = localStorage.getItem('selected');
  const navigate = useNavigate();
  const theme = useTheme();
  const pcolor = theme.palette.primary.main;
  const plcolor = blue[50];
  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size='1.3rem'
      style={{
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
    />
  ) : (
    <FiberManualRecord
      // size='1.3rem'
      fontSize='inherit'
      sx={{ width: '8px', height: '8px' }}
    />
  );
  function setSelected(s) {
    localStorage.setItem('selected', s);
  }
  return (
    <ListItemButton
      sx={{
        borderRadius: '8px',
        mb: 0.5,
        alignItems: 'flex-start',
        paddingLeft: toggle ? '48px' : '1rem',
        '&:hover': {
          color: `${pcolor} !important`,
          backgroundColor: 'inherit',
          '& .MuiListItemIcon-root': {
            color: `${pcolor} !important`,
          },
        },
        '&.Mui-selected': {
          color: `${pcolor} !important`,
          backgroundColor: 'inherit',
          '& .MuiListItemIcon-root': {
            color: `${pcolor} !important`,
          },
          // '& .css-ksh4t7-MuiTypography-root': {
          //   fontWeight: '600 !important',
          // },
        },
      }}
      selected={selected === item.title}
      onClick={() => {
        setSelected(item.title);
        navigate(item.to, { replace: true });
      }}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={'body2'} color='inherit'>
            {item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default index;

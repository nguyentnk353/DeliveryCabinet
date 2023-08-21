import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from './ui-component/cards/MainCard';

// assets
import EarningIcon from './images/icons/earning.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#43a047',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '8px',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#2e7d32',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140,
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#2e7d32',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70,
    },
  },
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const ProfitCard = ({ sum }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction='column'>
            <Grid item>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <Avatar
                    variant='rounded'
                    sx={{
                      borderRadius: '8px',
                      width: '44px',
                      height: '44px',
                      fontSize: '1.5rem',
                      backgroundColor: '#2e7d32',
                      mt: 1,
                    }}
                  >
                    <img src={EarningIcon} alt='Notification' />
                  </Avatar>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems='center'>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: '2.125rem',
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    {sum - sum * (2 / 10)} VND
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Avatar
                    sx={{
                      cursor: 'pointer',
                      ...theme.typography.smallAvatar,
                      backgroundColor: theme.palette.secondary[200],
                      color: theme.palette.secondary.dark,
                    }}
                  >
                    <ArrowUpwardIcon
                      fontSize='inherit'
                      sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                    />
                  </Avatar> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: '#a5d6a7',
                }}
              >
                Total Profit
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

ProfitCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default ProfitCard;

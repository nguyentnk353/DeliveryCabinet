import React from 'react';
import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material';
import { Home, NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const index = ({ list }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  function setSelected(nav) {
    localStorage.setItem('selected', nav?.sb);
    return navigate(nav?.to, {
      state: {
        stateLink: nav?.state,
      },
    });
  }
  function setDashboard(s) {
    localStorage.setItem('selected', 'Dashboard');
  }
  return (
    <Box>
      <Breadcrumbs
        aria-label='breadcrumb'
        separator={<NavigateNext fontSize='small' />}
        sx={{ textAlign: 'center', alignItems: 'center' }}
      >
        <Link
          color='inherit'
          href='/admin/dashboard'
          onClick={setDashboard}
          sx={{
            display: 'flex',
            color: 'grey.900',
            textDecoration: 'none',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Home
            sx={{
              width: '1rem',
              height: '1rem',
              color: theme.palette.primary.main,
              mr: 0,
            }}
          />
        </Link>
        {list.map((e, i) => {
          const nav = { to: e?.to, sb: e?.sidebar, state: e?.state };
          if (i === list.length - 1) {
            return (
              <Typography
                variant='subtitle2'
                sx={{
                  display: 'flex',
                  textDecoration: 'none',
                  alignContent: 'center',
                  alignItems: 'center',
                  color: 'grey.500',
                }}
              >
                {e?.name}
              </Typography>
            );
          } else {
            return (
              <Link
                underline='hover'
                variant='subtitle2'
                color='inherit'
                onClick={() => setSelected(nav)}
                sx={{
                  display: 'flex',
                  color: 'grey.900',
                  textDecoration: 'none',
                  alignContent: 'center',
                  alignItems: 'center',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                {e?.name}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default index;

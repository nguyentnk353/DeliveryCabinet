import { Divider, List, Typography } from '@mui/material';
import React from 'react';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

const index = ({ item, toggle }) => {
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} item={menu} toggle={toggle} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} toggle={toggle} />;
      default:
        return (
          <Typography key={menu.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          toggle &&
          item.title && (
            <Typography
              variant='body2'
              sx={{
                // fontSize: '0.875rem',
                fontWeight: 600,
                // color: theme.heading,
                padding: '6px',
                textTransform: 'capitalize',
                marginTop: '10px',
                lineHeight: '1.66',
              }}
              display='block'
              gutterBottom
            >
              {item.title}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default index;

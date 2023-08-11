import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavItem from '../NavItem';
import NavItemCollapse from '../NavItemCollapse';

const NavCollapse = ({ item, toggle }) => {
  const selected = localStorage.getItem('selected');
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selecteOpen, setSelecteOpen] = useState(null);
  const pcolor = theme.palette.primary.main;
  const plcolor = blue[50];
  const { pathname } = useLocation();
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
    <FiberManualRecordIcon size='1.3rem' fontSize='inherit' />
  );

  const [anchorElPop, setAnchorElPop] = React.useState(null);

  const handleClickPop = (event) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };

  const openPop = Boolean(anchorElPop);

  function setSelected(s) {
    localStorage.setItem('selected', s);
  }
  function handleClick() {
    setOpen(!open);
    setSelecteOpen(true);
  }
  const checkOpenForParent = (child, id) => {
    child.forEach((item) => {
      if (item.to === pathname) {
        setOpen(true);
        setSelected(item.title);
      }
    });
  };
  useEffect(() => {
    setOpen(false);
    setSelecteOpen(null);
    if (item.children) {
      item.children.forEach((items) => {
        if (items.children?.length) {
          checkOpenForParent(items.children, item.title);
        }
        if (items.to === pathname) {
          setSelecteOpen(item.title);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, item.children]);
  const menus = item.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} toggle={toggle} />;
      case 'item':
        return <NavItemCollapse key={item.id} item={item} toggle={toggle} />;
      default:
        return (
          <Typography key={item.id} variant='h6' color='error' align='center'>
            Menu Items Error
          </Typography>
        );
    }
  });
  return (
    <Box
      aria-haspopup='true'
      onMouseEnter={handleClickPop}
      onMouseLeave={handleClosePop}
    >
      <ListItemButton
        sx={{
          borderRadius: '8px',
          mb: 0.5,
          alignItems: 'flex-start',
          '&:hover': {
            color: `${pcolor} !important`,
            backgroundColor: `${plcolor} !important`,
            '& .MuiListItemIcon-root': {
              color: `${pcolor} !important`,
            },
          },
          '&.Mui-selected': {
            color: `${pcolor} !important`,
            backgroundColor: `${plcolor} !important`,
            '& .MuiListItemIcon-root': {
              color: `${pcolor} !important`,
            },
            // '& .css-ksh4t7-MuiTypography-root': {
            //   fontWeight: '600 !important',
            // },
          },
        }}
        selected={selecteOpen}
        onClick={(e) => {
          handleClick();
          handleClickPop(e);
        }}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
          {itemIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            toggle && (
              <Typography variant={'body2'} color='inherit'>
                {item.title}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size='1rem'
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size='1rem'
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {toggle ? (
          <List
            component='div'
            disablePadding
            sx={{
              position: 'relative',
              '&:after': {
                content: "''",
                position: 'absolute',
                left: '32px',
                top: 0,
                height: '100%',
                width: '1px',
                opacity: 1,
                background: theme.palette.primary.light,
              },
            }}
          >
            {menus}
          </List>
        ) : (
          <Popover
            open={openPop}
            anchorEl={anchorElPop}
            onClose={handleClosePop}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List
              component='div'
              disablePadding
              sx={{
                position: 'relative',
                // '&:after': {
                //   content: "''",
                //   position: 'absolute',
                //   left: '32px',
                //   top: 0,
                //   height: '100%',
                //   width: '1px',
                //   opacity: 1,
                //   background: theme.palette.primary.light,
                // },
              }}
            >
              {menus}
            </List>
          </Popover>
        )}
      </Collapse>
    </Box>
  );
};

export default NavCollapse;

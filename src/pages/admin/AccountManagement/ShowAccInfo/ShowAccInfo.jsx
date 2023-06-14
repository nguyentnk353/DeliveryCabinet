import { Box, Button, Chip, CircularProgress, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react'
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useState } from 'react';
import UpLoadImage from '../components/UpLoadImage/UpLoadImage';
import { useLocation } from 'react-router-dom';
import ItemInfoAcc from './components/ItemInfoAcc';
import moment from 'moment';


const ShowAccInfo = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: "auto",
  }));

  return (
    <Box sx={{ p: "5%" }}>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Account Information
        </Typography>
      </Box>
      <Grid container spacing={6} columns={12}>
        <Grid item xs={4}>
          <Paper sx={{ borderRadius: "16px" }} elevation={3}>
            <Box sx={{ padding: "10% 0", }}>
              <Box sx={{
                margin: '0 10% 10% 0',
                display: 'flex',
                justifyContent: 'end'
              }}>
                <Chip
                  label={location?.state?.accountInfo.roleName}
                  size='small'
                  sx={{
                    color: '#1bcd7a',
                    bgcolor: '#e5fceb',
                    fontSize: '16px'
                  }}
                />
              </Box>
              <StyledAvatar src={location?.state?.accountInfo.imgUrl}>
                {loading ? <CircularProgress /> : null}
              </StyledAvatar>
              <Typography variant="h6" sx={{ fontWeight: "700", textAlign: "center", paddingTop: '20px' }}>
                {location?.state?.accountInfo.fullName}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ borderRadius: "16px" }} elevation={3}>
            <Box>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" sx={{ fontWeight: "700", p: '0 20px' , padding: "20px 0 0 20px"}}>
                  Personal  Information
                </Typography>
                <Button variant="text" sx={{p: '0 20px 0 0'}}>Edit Account</Button>
              </Box>
              <List component="nav" aria-label="mailbox folders">

                <ItemInfoAcc primaryLabel={"Full Name"} primaryContent={location?.state?.accountInfo.fullName} />
                <Divider />
                <ItemInfoAcc primaryLabel={"Email"} primaryContent={location?.state?.accountInfo.email} />
                <Divider />
                <ItemInfoAcc primaryLabel={"Phone"} primaryContent={location?.state?.accountInfo.phone} />
                <Divider />
                <ItemInfoAcc primaryLabel={"DOB"} primaryContent={moment(location?.state?.accountInfo.dob).format("DD-MM-YYYY")} />
                <Divider />
                <ItemInfoAcc primaryLabel={"Role"} primaryContent={location?.state?.accountInfo.roleName} />
                <Divider />
                <ItemInfoAcc primaryLabel={"Status"} primaryContent={(location?.state?.accountInfo.isEnable) ? "Active" : "InActive"} />

              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ShowAccInfo
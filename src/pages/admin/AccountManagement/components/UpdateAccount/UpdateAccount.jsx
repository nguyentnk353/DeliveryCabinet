import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment/moment";
import UpLoadImage from "../UpLoadImage/UpLoadImage";
import { useLocation, useNavigate } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import updateAccount from "../../../../../services/updateAccount";
import useNotification from "../../../../../utils/useNotification";
import deleteAccount from "../../../../../services/deleteAccount";


const UpdateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [msg, sendNotification] = useNotification();
  const statusList = [
    { name: "Active", id: true },
    { name: "InActive", id: false },
  ];
  const [status, setStatus] = useState(
    // statusList.filter((a) => a.id == location?.state?.accountInfo.isEnable)[0]
    location?.state?.accountInfo.isEnable
  );
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: location?.state?.accountInfo.fullName,
      email: location?.state?.accountInfo.email,
      phone: location?.state?.accountInfo.phone,
      // login_name: location?.state?.accountInfo.loginName,
      dob: moment(location?.state?.accountInfo?.dob),
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Full Name mininum 2 characters")
        .max(30, "Full Name maximum 30 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      phone: Yup.string()
        .required("Required!")
        .matches(phoneRegExp, "Phone number is not valid"),
    }),
    onSubmit: (values) => {
      const api = {
        id: location?.state?.accountInfo?.id,
        // loginName: values.login_name,
        fullName: values.full_name,
        email: values.email,
        phone: values.phone,
        dob: values.dob._i,
        isEnable: status,
        imgUrl: location?.state?.accountInfo?.imgUrl,
      };
      updateAccount(api)
        .then((res) => {
          if (res.status == 200) {
            sendNotification({
              msg: 'Account update success',
              variant: 'success',
            });
          } else {
            sendNotification({ msg: 'Account update fail', variant: 'error' });
          }
        })
        .catch((err) => {
          sendNotification({ msg: err, variant: 'error' });
        });
    },
  });

  function deleteAccountFunction() {
    deleteAccount(location?.state?.accountInfo?.id)
      .then((res) => {
        if (res.status == 200) {
          sendNotification({
            msg: 'Account delete success',
            variant: 'success',
          });
          navigate('/admin/account', { replace: true })
        } else {
          sendNotification({ msg: 'Account delete fail', variant: 'error' });
        }
      })
      .catch((err) => {
        sendNotification({ msg: err, variant: 'error' });
      });
  }
  return (
    <Box sx={{ p: "5%" }}>
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Update Account
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={6} columns={12}>
          <Grid item xs={4}>
            <Paper sx={{ borderRadius: "16px" }} elevation={3}>
              <Box
                sx={{
                  padding: "16% 0",
                }}
              >
                <UpLoadImage />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper sx={{ borderRadius: "16px" }} elevation={3}>
              <Box sx={{ padding: "20px" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      label="Full Name"
                      id="full_name"
                      variant="outlined"
                      value={formik.values.full_name}
                      onChange={formik.handleChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {formik.errors.full_name && formik.touched.full_name && (
                      <p>{formik.errors.full_name}</p>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Email"
                      id="email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p>{formik.errors.email}</p>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Phone"
                      id="phone"
                      variant="outlined"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <p>{formik.errors.phone}</p>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ paddingTop: "5%" }}>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            label="Date Of Birth"
                            sx={{ width: '100%' }}
                            // defaultValue={moment(location?.state?.accountInfo?.dob)}
                            value={moment(dob)}
                            onChange={(newValue) => {
                              setDob(moment(newValue.$d))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </DemoContainer>
                      </LocalizationProvider> */}
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label="Date Of Birth"
                          sx={{ width: '100%' }}
                          id="dob"
                          name="dob"
                          required
                          value={formik.values.dob}
                          onChange={(value) => {
                            formik.setFieldValue("dob", value);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <TextField
                      label="Login Name"
                      id="login_name"
                      variant="outlined"
                      value={formik.values.login_name}
                      onChange={formik.handleChange}
                      fullWidth
                      margin="normal"
                      required
                    />
                    {formik.errors.login_name && formik.touched.login_name && (
                      <p>{formik.errors.login_name}</p>
                    )}
                  </Grid> */}
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      id="Status"
                      defaultValue={
                        statusList.filter(
                          (a) => a.id == location?.state?.accountInfo.isEnable
                        )[0]
                      }
                      sx={{ paddingTop: "4.5%" }}
                      options={statusList}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setStatus(newValue.id);
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.name === value.name && option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Status" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Box sx={{ marginLeft: "auto", marginTop: "20px", }}>
                    <Button
                      variant="contained"
                      sx={{
                        margin: '20px',
                        backgroundColor: '#D32F2F',
                      }}
                      onClick={deleteAccountFunction}
                    >
                      Ban Account
                    </Button>
                    <Button variant="contained" type="submit">
                      Update Account
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateAccount;

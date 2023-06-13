import {
    Autocomplete,
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from 'react';
import UploadAvatar from './components/UploadAvatar/UploadAvatar';
import { useFormik } from 'formik';
import * as Yup from "yup";
import moment from 'moment/moment';
import postAccount from './../../../services/postAccount';
const CreateAccount = () => {

    const [role, setRole] = useState({ name: 'Role', id: 0 });
    const [dob, setDob] = useState();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const roleList = [
        { name: 'Admin', id: 1 },
        { name: 'Store Owner', id: 2 },
        { name: 'Staff', id: 3 },
        { name: 'Customer', id: 4 }
    ]
    const formik = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            phone: "",
            login_name: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            full_name: Yup.string()
                .min(2, "Full Name mininum 2 characters")
                .max(30, "Full Name maximum 30 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            phone: Yup.string()
                .required("Required!")
                .matches(phoneRegExp, 'Phone number is not valid'),
            login_name: Yup.string()
                .min(2, "Login Name mininum 2 characters")
                .max(15, "Login Name maximum 15 characters")
                .required("Required!"),
            password: Yup.string()
                .min(3, "Password minimum 3 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: (values) => {
            const api = {
                loginName: values.login_name,
                password: values.password,
                confirmPassword: values.confirm_password,
                fullName: values.full_name,
                email: values.email,
                phone: values.phone,
                dob: dob,
                role: role
            };
            
            postAccount(api)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <Box sx={{ p: '5%' }}>
            <Box sx={{ marginBottom: '2rem' }}>
                <Typography variant='h5' sx={{ fontWeight: '700' }}>
                    Create New Account
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={6} columns={12}>
                    <Grid item xs={4}>
                        <Paper sx={{ borderRadius: '16px' }} elevation={3}>
                            <Box
                                sx={{
                                    padding: '20% 0'
                                }}>
                                <UploadAvatar />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper sx={{ borderRadius: '16px' }} elevation={3}>
                            <Box
                                sx={{
                                    padding: '20px'

                                }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                                        <Box sx={{ paddingTop: '2%' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']}>
                                                    <DatePicker
                                                        label="Date Of Birth"
                                                        sx={{ width: '100%' }}
                                                        onChange={(newValue) => {
                                                            setDob(moment(newValue.$d).format())
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Autocomplete
                                            disablePortal
                                            id='Role'
                                            sx={{ paddingTop: '4.5%' }}
                                            options={roleList}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setRole(newValue.id);
                                                }
                                            }

                                            }
                                            isOptionEqualToValue={(option, value) => option.name === value.name && option.id === value.id}
                                            renderInput={(params) => (
                                                <TextField {...params} label='Role' />
                                            )}
                                        />
                                    </Grid><Grid item xs={6}>
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
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Password"
                                            id="password"
                                            variant="outlined"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        {formik.errors.password && formik.touched.password && (
                                            <p>{formik.errors.password}</p>
                                        )}
                                    </Grid><Grid item xs={6}>
                                        <TextField
                                            label="Confirm Password"
                                            id='confirm_password'
                                            variant="outlined"
                                            value={formik.values.confirm_password}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                        />
                                        {formik.errors.confirm_password && formik.touched.confirm_password && (
                                            <p>{formik.errors.confirm_password}</p>
                                        )}
                                    </Grid>
                                    <Box sx={{ marginLeft: 'auto', marginTop: '20px' }}>
                                        <Button
                                            variant='contained'
                                            type='submit'
                                        >
                                            Create Account
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default CreateAccount
import {
    Box,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import React from 'react';
const CreateAccount = () => {
    return (
        <Box sx={{ p: '5%' }}>
            <Box
                sx={{
                    marginBottom: '2rem'
                }}
            >
                <Typography variant='h5' sx={{ fontWeight: '700' }}>
                    Create New Account
                </Typography>
            </Box>

            <Grid container spacing={6} columns={12}>
                <Grid item xs={4}>
                    <Paper sx={{ borderRadius: '16px'}} elevation={3}>
                        <Box 
                            sx={{
                                width: '30%',
                               
                                
                        }}>
                            aa
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                <Paper sx={{ borderRadius: '16px'}} elevation={3}>
                        <Box 
                            sx={{
                                
                                                
                        }}>
                            aa
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CreateAccount
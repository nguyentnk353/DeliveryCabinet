import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const StoreTypeManagement = () => {
    return (
        <div>
            <Paper elevation={0}
                sx={{
                    height: '10%',
                    width: '90%',
                    margin: '3% 5% 5% 7%',

                }}>
                <Grid container spacing={8} columns={16}>
                    <Grid item xs={12}>
                        <Box>Store Type List</Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained">Add Store Type</Button>
                    </Grid>
                </Grid>
            </Paper>

           <Box>
                
           </Box>

        </div>
    );
};

export default StoreTypeManagement;
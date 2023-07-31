import { Box, Grid, ListItemText } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

const ItemInfoAcc = ({primaryLabel, primaryContent}) => {
    return (
        <Box sx={{padding: '10px 20px'}}>
            <Grid container spacing={2} columns={12}>
                <Grid item xs={3}>
                    <ListItemText primary={primaryLabel} primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
                </Grid>
                <Grid item xs={9}>
                    <ListItemText primary={primaryContent} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ItemInfoAcc
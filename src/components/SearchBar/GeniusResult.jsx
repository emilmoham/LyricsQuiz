import React from 'react';
import { Grid, Typography } from '@mui/material';

function GeniusResult(props, option) {
  return (
    <li {...props}>
      <Grid container alignItems='center'>
        <Grid
          item
          sx={{
            display: 'flex',
            width: 35
          }}
        >
          <img
            className='result__thumbnail'
            alt='ablum art'
            src={option.result.header_image_thumbnail_url}
          />
        </Grid>
        <Grid
          item
          sx={{
            width: 'calc(100% - 44px)',
            wordWrap: 'break-word',
            paddingLeft: 2
          }}
        >
          <Typography variant='subtitle1'>
            {option.result.full_title}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
}

export default GeniusResult;

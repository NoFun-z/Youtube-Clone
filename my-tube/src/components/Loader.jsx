import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

const Loader = () => (
  <Box sx={{ minHeight: '75vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
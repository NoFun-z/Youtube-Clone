import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {

  const [SelectedCT, setSlectedCT] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${SelectedCT}`)
    .then((data) => setVideos(data.items))
  }, [SelectedCT]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh '}, borderRight: '1px solid #3d3d3d', pd: { sx: 0, md: 2 }}}>
        <Sidebar
          selectedCategory={SelectedCT}
          setSelectedCategory={setSlectedCT}
        />

        <Typography classname="copyright" variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
          Copyright 2023 Loc Tube
        </Typography>
      </Box>

      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
            {SelectedCT} <span style={{ color: '#F31503'}}>videos</span>
        </Typography>

        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
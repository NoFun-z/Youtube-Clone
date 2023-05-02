import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {
  const [selectedCT, setSelectedCT] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCT}`)
      .then((data) => setVideos(data.items))
    }, [selectedCT]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: 'auto', md: '92vh '}, borderRight: '1px solid #3d3d3d', pd: { sx: 0, md: 2 }}}>
        <Sidebar
          selectedCategory={selectedCT}
          setSelectedCategory={setSelectedCT}
        />

        <Typography classname="copyright" variant='body2' sx={{ mt: 0, ml: 0.5, color: '#fff' }}>
          Copyright Loc Tube
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
            {selectedCT} <span style={{ color: '#F31503'}}>videos</span>
        </Typography>

        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
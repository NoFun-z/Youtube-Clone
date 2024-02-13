import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Sidebar, Videos } from './';

const Feed = () => {
  const [selectedCT, setSelectedCT] = useState("Home");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCT === 'Home' ? 'New' : selectedCT}`)
      .then((data) => setVideos(data.items))
  }, [selectedCT]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: 'auto', md: '88vh ' }, borderRight: '1px solid #3d3d3d', p: { sx: 0, md: 2 } }}>
        <Sidebar
          selectedCategory={selectedCT}
          setSelectedCategory={setSelectedCT}
        />

        <Typography className="copyright" variant='body2' sx={{
          ml: 0.5, mt: 2.8, color: '#f2f2f2',
          display: { xs: 'none', md: 'block' }
        }}>
          &#169; Loc Tube - 2024
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: {xs: "78vh", md: "88vh"}, flexGrow: 1}}>
        <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: '#f2f2f2' }}>
          {selectedCT === 'Home' ? 'New' : selectedCT} <span style={{ color: '#ff4d4d' }}>videos</span>
        </Typography>

        <Videos videos={videos} isDetailed={false} />
      </Box>
    </Stack>
  )
}

export default Feed
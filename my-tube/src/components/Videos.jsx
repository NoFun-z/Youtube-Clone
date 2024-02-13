import React from "react";
import { Stack, Box, Grid } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction, isDetailed }) => {
  if (!videos?.length) return <Loader />;

  return (
    direction ?
      (<Stack direction={direction} justifyContent="start" alignItems="start" gap={2}>
        {
          videos.map((item, idx) => (
            <Box key={idx} width="100%">
              {item.id.videoId && <VideoCard video={item} isDetailed={isDetailed}/>}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          ))
        }
      </Stack >) :
      (<Grid container columnSpacing={2} sx={{}}>
        {
          videos.map((item, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Box key={idx}>
                {item.id.videoId && <VideoCard video={item} isDetailed={isDetailed} />}
                {item.id.channelId && <ChannelCard channelDetail={item} />}
              </Box>
            </Grid>
          ))
        }
      </Grid >)
  );
}

export default Videos;
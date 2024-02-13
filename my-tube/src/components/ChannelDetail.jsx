import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Videos, ChannelCard, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  const bannerStyles = {
    height: '300px',
    width: "100%",
    zIndex: 10,
    backgroundImage: channelDetail?.brandingSettings?.image
      ? `url(${channelDetail.brandingSettings.image.bannerExternalUrl})`
      : "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
    backgroundSize: channelDetail?.brandingSettings?.image ? 'cover' : undefined,
    backgroundRepeat: channelDetail?.brandingSettings?.image ? 'no-repeat' : undefined,
  };

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  if (!channelDetail) return <Loader />;

  return (
    <Box minHeight="92vh">
      <Box>
        <div style={bannerStyles} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex"
        justifyContent={channelDetail?.statistics?.videoCount > 0 ? "flex-start" : "center"}>
        <Box sx={{}} />
        {channelDetail?.statistics?.videoCount > 0 ? (<Videos videos={videos} isDetailed={false} />) : (
          <Typography variant="subtitle1"
            sx={{ fontSize: "25px", color: "#f2f2f2" }}>
            This channel has not posted any videos yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
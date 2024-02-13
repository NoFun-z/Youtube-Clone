import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimeAgoFormat from '../utils/timeAgoFormat';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const AspectRatioBox = ({ ratio, children }) => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: 0, // Collapse the div to a line
    paddingTop: `${(1 / ratio) * 100}%`, // Padding top is based on parent width
    overflow: 'hidden',
    borderRadius: '10px',
  }}>
    {children}
  </div>
);

const VideoCard = ({ video: { id: { videoId }, snippet }, isDetailed }) => {
  return (
    <Card sx={{
      width: isDetailed ? { xs: '100%', md: "280px", lg: "350px" } : '100%',
      boxShadow: "none", borderRadius: 0, overflow: 'hidden', backgroundColor: 'transparent'
    }}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <AspectRatioBox ratio={16 / 9}>
          <CardMedia
            component="img"
            image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
            alt={snippet?.title}
            sx={{
              position: 'absolute', // Positioned absolutely to fill the parent
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Image will cover the area, cropping if necessary
            }}
          />
        </AspectRatioBox>
      </Link>
      <CardContent sx={{
        backgroundColor: "transparent", height: !isDetailed ? { xs: '92px', md: '106px' } :
          '75px'
      }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} >
          <Typography variant="subtitle2" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
            {snippet?.title.length > 60 && "..."}
          </Typography>
        </Link>
        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color="gray" sx={{ fontSize: '12px' }}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px", mt: "10px" }} />
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="gray" sx={{ fontSize: '12px' }}>
          {snippet?.publishTime && <TimeAgoFormat date={snippet?.publishTime} />}
          {/* {Math.floor((new Date() - new Date(snippet?.publishTime.toString())) / 1000)} */}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default VideoCard
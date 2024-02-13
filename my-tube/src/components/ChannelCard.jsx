import React, { Fragment, useState } from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop, isDetailed }) => {

  const [showChannelDesc, setShowChannelDesc] = useState(null);

  return (
    <Fragment>
      <Box
        sx={{
          boxShadow: 'none',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '356px', md: '320px' },
          height: '326px',
          margin: 'auto',
          marginTop,
        }}
      >
        <Link to={`/channel/${channelDetail?.id?.channelId}`}>
          <CardContent
            sx={{
              display: 'flex', flexDirection: 'column', width: '100%',
              justifyContent: 'center', textAlign: 'center', color: '#f2f2f2'
            }}>
            <CardMedia
              component="img"
              image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
              alt={channelDetail?.snippet?.title}
              sx={{
                borderRadius: '50%', height: '180px', width: '180px',
                mb: 2, border: '1px solid #e3e3e3', marginX: "auto"
              }}
            />
            <Typography variant="h6">
              {channelDetail?.snippet?.title}{' '}
              <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
            </Typography>
            {isDetailed && (<>
              <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} {" "}
                {parseInt(channelDetail?.statistics?.subscriberCount) > 1
                  || parseInt(channelDetail?.statistics?.subscriberCount) > 1 ? "Subscribers" : "Subscriber"} {" - "}
                {channelDetail?.statistics?.videoCount}{" "}
                {parseInt(channelDetail?.statistics?.videoCount) < 1
                  || parseInt(channelDetail?.statistics?.videoCount) > 1 ? "videos" : "video"}
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                {channelDetail?.statistics?.viewCount}{" "}
                {parseInt(channelDetail?.statistics?.viewCount) < 1
                  || parseInt(channelDetail?.statistics?.viewCount) > 1 ? "total video views" : "total video view"}
              </Typography>
            </>)}

          </CardContent>
        </Link>
      </Box>
      {isDetailed && channelDetail?.snippet?.description &&
        (<Box sx={{ padding: "15px" }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
            <span style={{ fontWeight: "bold", color: "#f2f2f2" }}>Channel Descriptions: </span>
            {!showChannelDesc ? (
              <>
                {channelDetail?.snippet?.description.slice(0, 150)}
                {channelDetail?.snippet?.description.length > 150 && (
                  <span>
                    ...<span className='view-desc' style={{ color: "#f2f2f2" }}
                      onClick={() => setShowChannelDesc(true)}>more</span>
                  </span>
                )}
              </>
            ) : (
              <>
                {channelDetail?.snippet?.description} <br/>
                <span className='view-desc' style={{ display: "inline-block", color: "#f2f2f2" }}
                  onClick={() => setShowChannelDesc(false)}> Hide Less</span>
              </>
            )}
          </Typography>
        </Box>)}
      {parseInt(channelDetail?.statistics?.videoCount) > 0 && (<Typography sx={{
        padding: "5px 15px",
        fontSize: '24px', fontWeight: "bold", color: '#f2f2f2'
      }}>
        Showing top {parseInt(channelDetail?.statistics?.videoCount) > 50 ?
          "50" : channelDetail?.statistics?.videoCount}{" out of "} {channelDetail?.statistics?.videoCount}{" "}
        {parseInt(channelDetail?.statistics?.videoCount) < 1
          || parseInt(channelDetail?.statistics?.videoCount) > 1 ? "videos" : "video"}
      </Typography>)}

    </Fragment>)
};

export default ChannelCard;
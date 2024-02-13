import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { demoProfilePicture } from '../utils/constants';
import TimeAgoFormat from '../utils/timeAgoFormat';

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { formatDateTime } from "../utils/formatDateTime"

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const [showDesc, setShowDesc] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  // Separate useEffect for comments
  useEffect(() => {
    const fetchData = async () => {
      setIsCommentsLoading(true);

      try {
        const data = await fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`);
        setComments(data.items);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle errors gracefully
      } finally {
        setIsCommentsLoading(false);
      }
    };

    fetchData();
    // Use AbortController to cancel the request if component unmounts or id changes
    const abortController = new AbortController();
    return () => abortController.abort();
  }, [id]);

  // Main useEffect for video and channel details
  useEffect(() => {
    const fetchData = async () => {
      const videoData = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(videoData.items[0]);

      const relatedVideosData = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      setVideos(relatedVideosData.items);

      if (videoData.items[0]?.snippet?.channelId) {
        const channelData = await fetchFromAPI(`channels?part=snippet&id=${videoData.items[0].snippet.channelId}`);
        setChannelDetail(channelData.items[0]);
      }
    };

    fetchData();
  }, [id]);

  if (!videos) return <Loader />;

  const { snippet: { title, channelId, channelTitle, publishedAt, description },
    statistics: { viewCount, likeCount, commentCount } } = videoDetail;

  return (
    <Box minHeight="95vh" overflow="auto" sx={{ padding: { xs: "0 10px", lg: "0 50px 0 30px", xl: "0 80px 0 60px" } }}>
      <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 0, md: 1 }}>
        <Box flex={1}>
          <Box sx={{ minWidth: '95%', position: "sticky", padding: "5px 12px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#f2f2f2" variant="h5" fontWeight="bold" pt={2} fontSize="18px">
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#f2f2f2" }} py={1} alignItems="center" >
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Link to={`/channel/${channelId}`}>
                  <img src={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                    alt={channelDetail?.snippet?.title}
                    style={{ borderRadius: '50%', height: '40px', width: '40px' }} />
                </Link>
                <Stack direction="column">
                  <Link to={`/channel/${channelId}`}>
                    <Typography variant="subtitle1" color="#f2f2f2" sx={{
                      fontWeight: "bold",
                      fontSize: "13px"
                    }} >
                      {channelTitle}
                      <CheckCircleIcon sx={{ fontSize: "10px", color: "gray", ml: "5px" }} />
                    </Typography>
                  </Link>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'gray' }}>
                    {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" gap="20px" alignItems="center">
                <ThumbUpOffAltIcon sx={{ marginRight: "-15px", color: "#f2f2f2" }} />
                <Typography variant="body1" color="#f2f2f2" sx={{ fontWeight: "bold", fontSize: '14px' }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ marginTop: "5px", padding: "10px", borderRadius: "15px" }} backgroundColor="#333333">
              <Stack direction="column" justifyContent="space-between" sx={{ color: "#fff" }} >
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ color: "#f2f2f2", fontWeight: "bold", fontSize: '14px' }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1" sx={{
                    marginLeft: "-10px", color: "#f2f2f2",
                    fontWeight: "bold", fontSize: '14px'
                  }}>
                    {formatDateTime(publishedAt.toString())}
                  </Typography>
                </Stack>
                {description && (<Typography variant="body1" sx={{
                  color: "#f2f2f2", fontWeight: "bold",
                  paddingTop: "5px", fontSize: '14px'
                }}>
                  {!showDesc ? (
                    <>{description.slice(0, 120)}...<span className="view-desc"
                      onClick={() => setShowDesc(true)}> more</span></>
                  ) : (
                    description
                  )}
                </Typography>)}
              </Stack>
              {showDesc &&
                (<Typography
                  variant="body1"
                  sx={{
                    color: "#f2f2f2",
                    fontWeight: "bold",
                    paddingTop: "10px",
                    fontSize: '14px'
                  }}
                  onClick={() => setShowDesc(false)}
                >
                  <span className="hide-desc">Hide less</span>
                </Typography>)
              }
            </Box>
            {isCommentsLoading ? (<Loader />)
              : (
                <Box pt={2}>
                  <Typography color="#f2f2f2" variant="h5" fontWeight="bold" fontSize="18px">
                    {comments ? (<>
                      Showing top {comments?.length} out of {commentCount} {commentCount > 1 ? 'comments' : "comment"}
                    </>) : (
                      <>This video currently has no comments</>
                    )}
                  </Typography>
                  <hr style={{
                    height: "1px", width: "100%", backgroundColor: "#f2f2f2",
                    margin: "5px 0", opacity: 0.7
                  }} />
                  {comments && (<Stack direction="column" gap={3} paddingTop="20px">
                    {comments.map((c, idx) => (
                      <Stack key={idx} direction="row" gap={1.5}>
                        <Link to={`/channel/${c?.snippet?.topLevelComment?.snippet?.authorChannelId.value}`}>
                          <img src={c?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || demoProfilePicture}
                            alt={channelDetail?.snippet?.title}
                            style={{ borderRadius: '50%', height: '40px', width: '40px' }} />
                        </Link>
                        <Stack direction="column">
                          <Link to={`/channel/${c?.snippet?.topLevelComment?.snippet?.authorChannelId.value}`}>
                            <Typography variant="subtitle1" color="#f2f2f2" sx={{
                              fontWeight: "bold",
                              fontSize: "13px"
                            }} >
                              {c?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                              <span style={{ fontSize: '13px', fontWeight: 500, color: 'gray', marginLeft: "5px" }}>
                                <TimeAgoFormat date={c?.snippet?.topLevelComment?.snippet?.publishedAt} />
                              </span>
                            </Typography>
                          </Link>
                          <Typography variant="subtitle1" color="#f2f2f2" sx={{
                            fontWeight: "bold",
                            fontSize: "13px"
                          }}>
                            {c?.snippet?.topLevelComment?.snippet?.textOriginal}
                          </Typography>
                          <Stack direction="row" gap="20px" alignItems="center">
                            <ThumbUpOffAltIcon sx={{ marginRight: "-15px", fontWeight: 500, color: 'gray' }} />
                            <Typography variant="body1" sx={{ fontSize: '13px', fontWeight: 500, color: 'gray' }}>
                              {parseInt(c?.snippet?.topLevelComment?.snippet?.likeCount).toLocaleString()}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>)}
                </Box>
              )}
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" isDetailed={true} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
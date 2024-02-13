import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900} color="#f2f2f2" mb={3} ml={{ sm: "3px" }}>
        Video results for <span style={{ color: "#ff4d4d" }}>{searchTerm}</span>
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '3px' } }} />
        {<Videos videos={videos} isDetailed={false}/>}
      </Box>
    </Box>
  );
};

export default SearchFeed;
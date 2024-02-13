import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
      paddingRight: {md: "10px"},
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#ff4d4d",
          color: "#f2f2f2",
        }}
        key={category.name}
      >
        <span style={{ color: category.name === selectedCategory ? "#f2f2f2" : "#ff4d4d", marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? "1" : "0." }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Categories;
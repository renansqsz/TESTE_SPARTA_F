import React from "react";
import { Typography, Box } from "@mui/material";

interface TitleProps {
  text: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const Title: React.FC<TitleProps> = ({ text, subtitle, align = "left" }) => {
  return (
    <Box mb={3} textAlign={align}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#1e1e2f",
          letterSpacing: "0.5px",
          "@media (max-width:600px)": {
            fontSize: "1.8rem",
          },
        }}
      >
        {text}
      </Typography>

      {subtitle && (
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ color: "gray.700" }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Title;

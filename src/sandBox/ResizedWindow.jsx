import React from "react";
import useWindowResize from "./hooks/useWindowResize";
import { Box, Typography } from "@mui/material";

export default function ResizedWindow() {
  const windowSize = useWindowResize();
    console.log(windowSize);


  return <Box>
    <Typography>The current window width is: {windowSize.width}</Typography>
    <Typography>The current window height is: {windowSize.height}</Typography>
  </Box>;
}

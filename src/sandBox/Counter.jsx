import React from "react";
import { Box, Button, Typography } from "@mui/material";
import useCounter from "./hooks/useCounter";

export default function Counter() {

  const { counter, increment, decrement, reset } = useCounter(0, 1);

  return (
    <Box>
      <Button variant="contained" onClick={increment}>
        +
      </Button>
      <Button variant="contained" onClick={decrement}>
        -
      </Button>
      <Button variant="contained" onClick={reset}>reset</Button>
      <Typography variant="h3">{counter}</Typography>
    </Box>
  );
}

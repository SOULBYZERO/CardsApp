import { Button, TableCell, TableHead, TableRow, Box } from "@mui/material";
import React from "react";

export default function TableTop({ refreshFunc, isLoading }) {
  return (
    <Box>
      {isLoading ? (
        <TableHead>
        <TableRow>
          <TableCell>Country name:</TableCell>
          <TableCell>
            <Button variant="contained" disabled>
              Refrash list
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      ) : (
        <TableHead>
          <TableRow>
            <TableCell>Country name:</TableCell>
            <TableCell>
              <Button variant="contained" onClick={refreshFunc}>
                Refrash list
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
      )}
    </Box>
  );
}




import { TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import Spinner from "../../components/Spinner";

export default function TableContent({ countriesList, isLoading }) {
  if (isLoading) return <Spinner />;
  if (countriesList && countriesList.length === 0) {
    return (
      <Typography m={2}>
        Oops... it seems there are no Countries to display
      </Typography>
    );
  }
  if (countriesList) {
    return (
      <TableBody>
        {countriesList.map((Country, index) => (
          <TableRow key={index}>
            <TableCell sx={{ width: "15rem" }}>{Country.name.common}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

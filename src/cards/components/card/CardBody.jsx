import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { Recommend } from "@mui/icons-material";

export default function CardBody({
  title,
  subtitle,
  phone,
  address,
  cardNumber,
  cardLikes,
}) {
  return (
    <Box sx={{ height: 220, display: "flex", flexDirection: "column" }}>
      <CardHeader title={title} subheader={subtitle} />
      <Divider variant="middle" textAlign="right">
        <strong>
          <Recommend fontSize="medium" />
          {cardLikes}
        </strong>
      </Divider>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Phone: </strong>
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address: </strong>
          {address.city} {address.street} {address.houseNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Card Number: </strong>
          {cardNumber}
        </Typography>
      </CardContent>
    </Box>
  );
}

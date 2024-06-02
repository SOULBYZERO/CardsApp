import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function CardBody({
  title,
  subtitle,
  phone,
  address,
  cardNumber,
  cardLikes,
}) {
  return (
    <Box sx={{ height: 250 }}>
      <CardHeader title={title} subheader={subtitle} />
      <Divider variant="middle" textAlign="right">
        <strong>
          <ThumbUpIcon fontSize="small" />
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

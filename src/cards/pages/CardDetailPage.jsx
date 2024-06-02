import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import OneCardData from "../components/card/OneCardData";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import useCards from "../hooks/useCards";
import MapComponent from "../components/MapComponent";
import EditCardButton from "../components/EditCardButton";
import { useUser } from "../../users/providers/UserProvider";

export default function CardDetailPage() {
  const { user } = useUser();
  const { id } = useParams();
  const { value, getCardDetails } = useCards();
  const { isLoading, error, cardData } = value;

  useEffect(() => {
    getCardDetails(id);
  }, [id, getCardDetails]);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cardData) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 1,
          mt: 4,
          mb: 4,
          maxWidth: "1300px",
          mx: "AUTO",
        }}>
        <Container>
          <PageHeader
            title="Card Details"
            subtitle="Here you can find all the details about specific card"
          />
          {/* לטפל */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <OneCardData cardData={cardData} />
            {user && user._id === cardData.user_id ? (
              <EditCardButton cardId={cardData._id} />
            ) : null}
            <Box>
              <Typography>
                Address: {cardData.address.street} ,{" "}
                {cardData.address.houseNumber} , {cardData.address.city} ,{" "}
                {cardData.address.state} , {cardData.address.country} ,{" "}
                {cardData.address.zip}
              </Typography>
              <MapComponent cardData={cardData} />
              <Typography>
                Card Created At: {new Date(cardData.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Paper>
    );
  }
}

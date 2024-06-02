import { Container } from "@mui/material";
import React from "react";
import CardComponent from "./card/CardComponent";

export default function Cards({ cardsList, handleCardDelete, handleCardLike }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cardsList.map((card) => (
        <CardComponent
          key={card._id}
          card={card}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
        />
      ))}
    </Container>
  );
}

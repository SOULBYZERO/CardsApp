import React from "react";
import Cards from "./Cards";
import Spinner from "../../components/Spinner";
import { Typography } from "@mui/material";
import Error from "../../components/Error";
import { useLocation } from "react-router-dom";

export default function CardsFeedBack({
  isLoading,
  cardsList,
  error,
  handleCardDelete,
  handleCardLike,
  count,
}) {
  const location = useLocation();

  const getNoCardsMessage = () => {
    switch (location.pathname) {
      case "/my-cards":
        return "Oops.. it seems you have no existing business cards to display";
      case "/fav-cards":
        return "Oops.. it seems there are no favorite business cards to display";
      default:
        return "Oops.. it seems there are no business cards to display";
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cardsList && cardsList.length === 0) {
    return <Typography m={2}>{getNoCardsMessage()}</Typography>;
  }
  if (cardsList) {
    return (
      <>
        <Cards
          cardsList={cardsList}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
        />
      </>
    );
  }
}

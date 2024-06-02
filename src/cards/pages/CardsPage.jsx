import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedBack from "../components/CardsFeedBack";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/AddNewCardButton";
import { useUser } from "../../users/providers/UserProvider";
import { Paper } from "@mui/material";

export default function CardPage() {
  const { value, handleCardDelete, handleCardLike, getAllCards } = useCards();
  const { isLoading, error, filteredCards } = value;

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  const { user } = useUser();

  return (
    <div>
      <PageHeader
        title="Cards"
        subtitle="On this page you can find all user created Cards"
      />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          mt: 4,
          mb: 4,
          maxWidth: "1500px",
          mx: "auto",
        }}>
        <CardsFeedBack
          cardsList={filteredCards}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          isLoading={isLoading}
          error={error}
        />
        {user && (user.isAdmin === true || user.isBusiness === true) ? (
          <AddNewCardButton />
        ) : null}
      </Paper>
    </div>
  );
}

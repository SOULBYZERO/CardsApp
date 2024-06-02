import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedBack from "../components/CardsFeedBack";
import useCards from "../hooks/useCards";
import AddNewCardButton from "../components/AddNewCardButton";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routs/routsModel";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { Paper } from "@mui/material";

export default function MyCardsPage() {
  const { value, handleCardDelete, handleCardLike, getAllCards } = useCards();

  const { isLoading, error, filteredCards, filterCount } = value;

  const { user } = useUser();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  useEffect(() => {
    if (user !== undefined) {
      setIsUserChecked(true);
    }
  }, [user]);

  if (!isUserChecked) {
    return <Spinner />;
  }

  if (!user) return <Navigate to={ROUTES.ROOT} replace />;

  return (
    <div>
      <PageHeader
        title="My cards"
        subtitle="On this page you can find all the bussines cards you create"
      />
      <Paper
        elevation={3}
        sx={{ padding: 4, mt: 4, mb: 4, maxWidth: "1300px", mx: "auto" }}>
        <CardsFeedBack
          cardsList={filteredCards}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          isLoading={isLoading}
          error={error}
          count={filterCount}
        />
      </Paper>
      <AddNewCardButton />
    </div>
  );
}

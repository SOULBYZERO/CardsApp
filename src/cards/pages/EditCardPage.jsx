import { Container, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import { useUser } from "../../users/providers/UserProvider";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import mapCardToModel from "../helpers/normalization/mapToModel";
import useCards from "../hooks/useCards";
import cardSchema from "../models/cardSchema";
import ROUTES from "../../routs/routsModel";
import { useAlert } from "../../providers/AlertProvider";
import { useSnackbar } from "../../providers/SnackbarProvider";

export default function EditCardPage() {
  //what do we need in this page
  //id of the card - useParams
  const { id } = useParams();
  //handleUpdateCard & handleGetCard & card - useCards
  const { handleUpdateCard, getCardDetails, handleCardDelete, value } =
    useCards();
  const { cardData } = value;
  const { snackbarActivation } = useSnackbar();

  //user - useUser (provider)
  const { user } = useUser();
  //useForm (initialForm,schema,onSubmit)
  const {
    data,
    errors,
    setData,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialCardForm, cardSchema, (newCard) =>
    handleUpdateCard(cardData._id, newCard)
  );

  const { alertActivation } = useAlert();

  //useEffect - update the form data to this card data
  useEffect(() => {
    getCardDetails(id).then((data) => {
      const modelCard = mapCardToModel(data);
      setData(modelCard);
    });
  }, [getCardDetails, setData, id]);

  const confirmEdit = () => {
    onSubmit(onSubmit);
  };

  const confirmDelete = () => {
    handleCardDelete(cardData._id);
    snackbarActivation("info", `${cardData._id} has been deleted`);
    setTimeout(() => window.location.replace("/cards"), 1500);
  };

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        elevation={3}
        sx={{
          padding: 1,
          mt: 4,
          mb: 4,
          maxWidth: "1300px",
          mx: "AUTO",
        }}>
        {data && (
          <CardForm
            title="edit card"
            onSubmit={() => {
              alertActivation(
                "info",
                "Edit Confirmation",
                "Are you sure you want to save changes?",
                confirmEdit
              );
            }}
            onReset={handleReset}
            errors={errors}
            validateForm={validateForm}
            onInputChange={handleChange}
            data={data}
            onDelete={() =>
              alertActivation(
                "warning",
                "Delete Confirmation",
                "Are you sure you want to delete this card?",
                confirmDelete
              )
            }
          />
        )}
      </Paper>
    </Container>
  );
}

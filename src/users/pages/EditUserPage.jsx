import React, { useEffect } from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import useUsers from "../hooks/useUsers";
import editSchema from "../models/editSchema";
import EditForm from "../components/EditForm";
import initialEditForm from "../helpers/initialForms/initialEditForm";
import userToModel from "../helpers/initialForms/userToModel";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routs/routsModel";
import { getUser } from "../services/localStorageService";
import { useAlert } from "../../providers/AlertProvider";
import { Paper } from "@mui/material";

export default function EditUserPage() {
  const { handleUpdateUser, handleGetUser } = useUsers();

  const user = getUser();
  if (!user) <Navigate replace to={ROUTES.ROOT} />;
  const {
    data,
    setData,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
  } = useForm(initialEditForm, editSchema, (newUser) => {
    handleUpdateUser(user, newUser);
  });
  const { alertActivation } = useAlert();

  useEffect(() => {
    handleGetUser(user._id).then((data) => {
      const modelUser = userToModel(data);
      setData(modelUser);
    });
  }, [handleGetUser, setData, user._id]);

  const confirmEdit = () => {
    onSubmit(onSubmit);
  };

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
        sx={{ padding: 4, mt: 4, mb: 4, maxWidth: "1100px", mx: "auto" }}>
        <EditForm
          onSubmit={() => {
            alertActivation(
              "info",
              "Edit Confirmation",
              "Are you sure you want to save changes?",
              confirmEdit
            );
          }}
          onReset={handleReset}
          validateForm={validateForm}
          title={"edit form"}
          errors={errors}
          data={data}
          onInputChange={handleChange}
        />
      </Paper>
    </Container>
  );
}

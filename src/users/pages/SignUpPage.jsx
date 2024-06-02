import React from "react";
import useForm from "../../forms/hooks/useForm";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import SignupForm from "../components/SignUpForm";
import Container from "@mui/material/Container";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routs/routsModel";
import useUsers from "../hooks/useUsers";
import { Paper } from "@mui/material";

export default function SignupPage() {
  const { handleSignup } = useUsers();

  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  const { user } = useUser();

  return user ? (
    <Navigate to={ROUTES.ROOT} replace />
  ) : (
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
        <SignupForm
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
          title={"register form"}
          errors={errors}
          data={data}
          onInputChange={handleChange}
          handleChangeCheckBox={handleChangeCheckBox}
        />
      </Paper>
    </Container>
  );
}

import React from "react";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/loginSchema";
import Container from "@mui/material/Container";
import PageHeader from "../../components/PageHeader";
import Form from "../../forms/components/Form";
import ROUTES from "../../routs/routsModel";
import Input from "../../forms/components/Input";
import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import useUsers from "../hooks/useUsers";
import { Button, Grid, Paper } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

export default function LogInPage() {
  const { handleLogin } = useUsers();

  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);

  const { user } = useUser();

  return user ? (
    <Navigate to={ROUTES.ROOT} replace />
  ) : (
    <Container>
      <PageHeader
        title="Welcome to Login page"
        subtitle="here you can log in"
      />
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
          <Form
            title="login"
            styles={{ maxWidth: "450px" }}
            to={ROUTES.ROOT}
            onSubmit={onSubmit}
            onReset={handleReset}
            validateForm={validateForm}>
            <Input
              label="email"
              name="email"
              type="email"
              error={errors.email}
              onChange={handleChange}
              data={data}
            />
            <Input
              label="password"
              name="password"
              type="password"
              error={errors.password}
              onChange={handleChange}
              data={data}
            />
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component={Link}
                to={ROUTES.SIGNUP}
                startIcon={<AccountBoxIcon />}
                sx={{ width: "100%" }}>
                Sign Up
              </Button>
            </Grid>
          </Form>
        </Paper>
      </Container>
    </Container>
  );
}

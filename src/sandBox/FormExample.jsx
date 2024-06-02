import React from "react";
import { Box, Button, TextField } from "@mui/material";
import Joi from "joi";
import useForm from "../forms/hooks/useForm";

const schema = {
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2).max(10),
};

const initialForm = {
  firstName: "",
  lastName: "",
};

const handleSubmit = (data) => {
  console.log(data);
};

export default function FormExample() {
  const { data, errors, handleChange, onSubmit, handleReset, validateForm } =
    useForm(initialForm, schema, handleSubmit);

  return (
    <Box>
      <Box sx={{ m: 10 }}>
        <TextField
          label="first name"
          value={data.firstName}
          name="firstName"
          onChange={handleChange}
          helperText={errors.firstName}
          error={Boolean(errors.firstName)}
        />
        <TextField
          label="last name"
          value={data.lastName}
          name="lastName"
          onChange={handleChange}
          helperText={errors.lastName}
          error={Boolean(errors.lastName)}
        />
        <Button onClick={onSubmit} disabled={!validateForm()}>
          Submit
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </Box>
  );
}
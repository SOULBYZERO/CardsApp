import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../routs/components/NavItem";
import ROUTES from "../../../../routs/routsModel";

const NotLogged = () => {
  return (
    <Box>
      <NavItem to={ROUTES.SIGNUP} lable="signup" />
      <NavItem to={ROUTES.LOGIN} lable="login" />
    </Box>
  );
};

export default NotLogged;

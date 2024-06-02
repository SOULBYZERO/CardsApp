import { Box } from "@mui/material";
import React from "react";
import Logo from "../logo/Logo";
import LogoIcon from "../logo/LogoIcon";
import ROUTES from "../../../../routs/routsModel";
import NavItem from "../../../../routs/components/NavItem";
import { useUser } from "../../../../users/providers/UserProvider";

export default function LeftNavBar() {
  const { user } = useUser();

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <LogoIcon />
      <Logo />
      <NavItem to={ROUTES.CARDS} lable={"Cards"} />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "row",
          alignItems: "center",
        }}>
        <NavItem to={ROUTES.ABOUT} lable={"About"} />
        {user && (user.isAdmin || user.isBusiness === true) ? (
          <NavItem to={ROUTES.MY_CARDS} lable={"my cards"} />
        ) : null}
        {user ? (
          <NavItem to={ROUTES.FAV_CARDS} lable={"favorite cards"} />
        ) : null}
      </Box>
      {user && user.isAdmin ? (
        <NavItem to="users-table" lable={"user table"} />
      ) : null}
    </Box>
  );
}

import { Typography } from "@mui/material";
import React from "react";
import NavBarLink from "../../../../routs/components/NavBarLink";
import ROUTES from "../../../../routs/routsModel";
import { useTheme } from "../../../../providers/CustomThemeProvider";

export default function Logo() {
  const { isDark } = useTheme();
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <Typography
        variant="h4"
        sx={{
          color: isDark ? "white" : "black",
          fontFamily: "fantasy",
          mr: 2,
          display: { xs: "none", sm: "inline-flex" },
        }}>
        CardApp
      </Typography>
    </NavBarLink>
  );
}

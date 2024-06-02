import { Button, Typography } from "@mui/material";
import React from "react";
import NavBarLink from "./NavBarLink";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function NavItem({ to, lable, sx }) {
  const { isDark } = useTheme();
  return (
    <NavBarLink sx={sx} to={to}>
      <Button
        color="inherit"
        sx={{
          color: isDark ? "white" : "black",
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          },
        }}>
        <Typography sx={{ color: "inherit" }}>{lable}</Typography>
      </Button>
    </NavBarLink>
  );
}

import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import { AppBar, Toolbar } from "@mui/material";
import RightNavBar from "./right-navigation/RightNavBar";
import { MenuProvider } from "./menu/MenuProvider";
import { useLocation } from "react-router-dom";
import SearchBar from "./right-navigation/SearchBar";
import { useTheme } from "../../../providers/CustomThemeProvider";

export default function NavBar() {
  const location = useLocation();
  const { isDark } = useTheme();
  return (
    <MenuProvider>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isDark ? "#533153" : "#c8a2c8",
          height: "80px",
          justifyContent: "center",
          elevation: 10,
        }}>
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "80px" }}>
          <LeftNavBar />
          <RightNavBar />
        </Toolbar>
        {location.pathname === "/cards" ||
        location.pathname === "/" ||
        location.pathname === "/my-cards" ||
        location.pathname === "/fav-cards" ? (
          <Toolbar
            sx={{
              display: { xs: "inline-flex", md: "none" },
              justifyContent: "center",
            }}>
            <SearchBar />
          </Toolbar>
        ) : null}
      </AppBar>
    </MenuProvider>
  );
}

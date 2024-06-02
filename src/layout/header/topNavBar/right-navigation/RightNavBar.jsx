import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import { useTheme } from "../../../../providers/CustomThemeProvider";
import { useLocation } from "react-router-dom";
import useUsers from "../../../../users/hooks/useUsers";
import SearchBar from "./SearchBar";

export default function RightNavBar() {
  const { isDark, toggleDarkMode } = useTheme();
  const { user } = useUser();
  const location = useLocation();
  const { handleGetUser, handleEdit } = useUsers();
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    user
      ? handleGetUser(user._id).then((data) => {
          setUserData(data);
        })
      : setUserData(false);
  }, [handleGetUser, user, handleEdit]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          display: { xs: "none", md: "inline-flex" },
          alignItems: "center",
        }}
      >
        {location.pathname === "/cards" ||
        location.pathname === "/my-cards" ||
        location.pathname === "/fav-cards" ? (
          <SearchBar />
        ) : null}
      </Box>

      <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode}>
        {isDark ? (
          <Tooltip title="Light Mode" TransitionComponent={Zoom} arrow>
            <LightModeIcon />
          </Tooltip>
        ) : (
          <Tooltip title="Dark Mode" TransitionComponent={Zoom} arrow>
            <DarkModeIcon />
          </Tooltip>
        )}
      </IconButton>
      {user && <Logged userData={userData} />}
      {!user && <NotLogged />}
    </Box>
  );
}

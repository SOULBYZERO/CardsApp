import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import InfoIcon from "@mui/icons-material/Info";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React from "react";
import ROUTES from "../../routs/routsModel";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";

export default function Footer() {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <Paper
      elevation={3}
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1 }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="About"
          icon={<InfoIcon />}
          onClick={() => navigate(ROUTES.ABOUT)}
        />
        {user ? (
          <BottomNavigationAction
            label="Favorite"
            icon={<StyleIcon />}
            onClick={() => navigate(ROUTES.FAV_CARDS)}
          />
        ) : null}
        {(user && user.isBusiness === true) ||
        (user && user.isAdmin === true) ? (
          <BottomNavigationAction
            label="My Cards"
            icon={<AccountBoxIcon />}
            onClick={() => navigate(ROUTES.MY_CARDS)}
          />
        ) : null}
      </BottomNavigation>
    </Paper>
  );
}

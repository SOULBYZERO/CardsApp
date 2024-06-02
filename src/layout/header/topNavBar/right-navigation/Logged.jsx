import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useMenu } from "../menu/MenuProvider";
import { Zoom } from "@mui/material";

const Logged = ({ userData }) => {
  const setOpen = useMenu();
  return (
    <Tooltip title="Open Menu" TransitionComponent={Zoom} arrow>
      <IconButton
        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
        onClick={() => setOpen(true)}
      >
        {userData ? (
          <Avatar alt={userData.image.alt} src={userData.image.url} />
        ) : (
          <Avatar alt="avatar" src="/assets/imgs/avatarLogged.png" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Logged;

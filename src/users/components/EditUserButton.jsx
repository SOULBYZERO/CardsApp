import { Fab, Tooltip, Zoom } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routs/routsModel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function EditUserButton() {
  const navigate = useNavigate();

  return (
    <Tooltip
      title="Edit Account"
      TransitionComponent={Zoom}
      placement="left"
      arrow
    >
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 75,
          right: 16,
        }}
        onClick={() => {
          navigate(ROUTES.EDIT_USER);
        }}
      >
        <ModeEditIcon />
      </Fab>
    </Tooltip>
  );
}

import { Fab, Tooltip, Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routs/routsModel";

export default function AddNewCardButton() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Add Card" TransitionComponent={Zoom} placement="left" arrow>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 75,
          right: 16,
        }}
        onClick={() => {
          navigate(ROUTES.CREATE_CARD);
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}

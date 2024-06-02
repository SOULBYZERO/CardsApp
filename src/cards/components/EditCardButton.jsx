import { Fab, Tooltip, Zoom } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routs/routsModel";

export default function EditCardButton({ cardId }) {
  const navigate = useNavigate();

  const handleCardEdit = (id) => {
    console.log("Navigate to edit page for card", id);
    navigate(ROUTES.EDIT_CARD + "/" + id);
  };

  return (
    <Tooltip
      title="Edit Card"
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
        onClick={() => handleCardEdit(cardId)}
      >
        <ModeEditIcon />
      </Fab>
    </Tooltip>
  );
}

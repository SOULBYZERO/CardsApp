import React, { useState } from "react";
import { Box, IconButton, CardActions, Tooltip, Zoom } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import { useUser } from "../../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routs/routsModel";
import { useSnackbar } from "../../../providers/SnackbarProvider";
import { useAlert } from "../../../providers/AlertProvider";

export default function CardActionBar({
  handleCardDelete,
  handleCardLike,
  cardId,
  userId,
  cardLikes,
  cardTitle,
  cardPhone,
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { snackbarActivation } = useSnackbar();
  const { alertActivation } = useAlert();

  let userLoginInfo = 0;
  if (user) {
    userLoginInfo = user._id;
  }

  const [liked, setLiked] = useState(cardLikes.includes(userLoginInfo));

  const toggleLike = () => {
    setLiked(!liked);
    const changeLikeStatus = handleCardLike(cardId);
    if (changeLikeStatus) {
      if (!liked) {
        return snackbarActivation(
          "info",
          `You added ${cardTitle} card to favorites`
        );
      } else {
        return snackbarActivation(
          "info",
          `You removed ${cardTitle} card from favorites`
        );
      }
    } else {
      setLiked(!liked);
    }
  };

  const handleCardEdit = (id) => {
    console.log("Navigate to edit page for card", id);
    navigate(ROUTES.EDIT_CARD + "/" + id);
  };

  const confirmDelete = () => {
    handleCardDelete(cardId);
    snackbarActivation("info", `${cardTitle} has been deleted`);
  };

  return (
    <CardActions sx={{ paddingTop: 0, justifyContent: "space-between" }}>
      <Box>
        {user && (user.isAdmin || user._id === userId) ? (
          <>
            <IconButton
              onClick={() =>
                alertActivation(
                  "error",
                  "Delete Confirmation",
                  `Are you sure you want to delete ${cardTitle}?`,
                  confirmDelete
                )
              }>
              <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
                <DeleteIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => handleCardEdit(cardId)}>
              <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
                <ModeEditIcon />
              </Tooltip>
            </IconButton>
          </>
        ) : null}
      </Box>
      <Box>
        <IconButton
          onClick={() =>
            alertActivation(
              "info",
              `The phone number of ${cardTitle} is:`,
              cardPhone
            )
          }>
          <Tooltip title="Call" TransitionComponent={Zoom} arrow>
            <CallIcon />
          </Tooltip>
        </IconButton>
        {user ? (
          <IconButton onClick={toggleLike}>
            {liked ? (
              <Tooltip title="Dislike" TransitionComponent={Zoom} arrow>
                <Favorite sx={{ color: "red" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Like" TransitionComponent={Zoom} arrow>
                <Favorite />
              </Tooltip>
            )}
          </IconButton>
        ) : null}
      </Box>
    </CardActions>
  );
}

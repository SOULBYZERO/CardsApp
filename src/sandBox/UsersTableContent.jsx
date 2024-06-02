import React, { useState } from "react";
import {
  Avatar,
  Checkbox,
  Fab,
  FormControlLabel,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAlert } from "../providers/AlertProvider";

export default function UsersTableContent({
  user,
  handleChangeCheckBox,
  handleDeleteUser,
}) {
  const [checkedStatus, setCheckedStatus] = useState(user.isBusiness);
  const toggleBusiness = () => {
    setCheckedStatus(!checkedStatus);
    handleChangeCheckBox(user);
  };

  const { alertActivation } = useAlert();

  const confirmDelete = () => {
    alertActivation(
      "info",
      "Delete Confirmation",
      `Are you sure you want to delete ${user.name.first} ${user.name.last}?`,
      () => handleDeleteUser(user)
    );
  };
  return (
    <TableRow key={user._id}>
      <TableCell>
        <Avatar src={user.image.url} alt={user.image.alt} />
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        <Typography>{`${user.name.first} ${user.name.middle} ${user.name.last}`}</Typography>
      </TableCell>
      <TableCell
        sx={{ maxWidth: "150px", whiteSpace: "normal", wordWrap: "break-word" }}
      >
        <Typography>{user.email}</Typography>
      </TableCell>
      <TableCell
        sx={{ maxWidth: "120px", whiteSpace: "normal", wordWrap: "break-word" }}
      >
        <Typography>{user.phone}</Typography>
      </TableCell>
      <TableCell sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        <Typography>{`${user.address.street} ${user.address.houseNumber}, ${user.address.city}, ${user.address.country}`}</Typography>
      </TableCell>
      <TableCell>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedStatus}
              onChange={() => toggleBusiness(user)}
              color="primary"
            />
          }
          label="Is Business"
        />
      </TableCell>
      <TableCell>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.isAdmin}
              disabled={true}
              sx={{ color: "#ccc" }}
            />
          }
          label={<Typography sx={{ color: "#ccc" }}>Is Admin</Typography>}
        />
      </TableCell>
      <TableCell>
        <Fab
          disabled={user.isAdmin}
          onClick={confirmDelete}
          sx={{ color: "red" }}
        >
          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
            <DeleteIcon />
          </Tooltip>
        </Fab>
      </TableCell>
    </TableRow>
  );
}

import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../users/hooks/useUsers";
import { getUser } from "../users/services/localStorageService";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import PageHeader from "../components/PageHeader";
import UsersTableContent from "./UsersTableContent";
import ROUTES from "../routs/routsModel";

export default function UsersTable() {
  const {
    handleDeleteUser,
    handleChangeBusinessStatus,
    handleGetAllUsers,
    error,
    isLoading,
  } = useUsers();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const handleChangeCheckBox = handleChangeBusinessStatus;

  useEffect(() => {
    const user = getUser();
    if (!user || user.isAdmin === false) {
      return navigate(ROUTES.ROOT);
    }

    const getData = async () => {
      const data = await handleGetAllUsers();
      setUsersData(data);
    };
    getData();
  }, [handleGetAllUsers, navigate]);

  if (error) return <Error errorMessage={error} />;
  if (isLoading) return <Spinner />;
  if (usersData.length > 0) {
    return (
      <Container maxWidth="xl">
        <PageHeader
          title="Users Table"
          subtitle="Here you can view users details and update Business state"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Is Business</TableCell>
                <TableCell>Is Admin</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user) => (
                <UsersTableContent
                  key={user._id}
                  user={user}
                  handleChangeCheckBox={handleChangeCheckBox}
                  handleDeleteUser={handleDeleteUser}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }

  return null;
}

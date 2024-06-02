import { AppBar, Container, Divider, Toolbar } from "@mui/material";
import React from "react";
import NavItem from "../routs/components/NavItem";
import { Outlet } from "react-router-dom";

export default function SendBox() {
  return (
    <>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <NavItem to="counter" lable="Counter page" sx={{ color: "black" }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem to="LifeCycle" lable="Life Cycle" sx={{ color: "black" }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem
            to="countries"
            lable="Countries list"
            sx={{ color: "black" }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem to="form" lable="form example" sx={{ color: "black" }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem
            to="ReSizedWindow"
            lable="Resized Window"
            sx={{ color: "black" }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem
            to="optimization"
            lable="optimization"
            sx={{ color: "black" }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem to="context" lable="context" sx={{ color: "black" }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <NavItem
            to="users-table"
            lable="users table"
            sx={{ color: "black" }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
        </Toolbar>
      </AppBar>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

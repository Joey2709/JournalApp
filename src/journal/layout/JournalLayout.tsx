import { Box, Toolbar } from "@mui/material";
import React from "react";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

interface JournalLayoutProps {
  children: JSX.Element[];
}

const drawerWidth = 240;

export const JournalLayout = ({ children }: JournalLayoutProps) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

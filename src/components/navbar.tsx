// src/components/Navbar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
} from "@mui/icons-material";

const drawerWidthOpen = 151;
const drawerWidthClosed = 60;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false); // Drawer inicia fechado
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden", // impede scroll horizontal
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "64px !important",
        }}
      >
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: open ? "auto" : "hidden", // scroll aparece só quando aberto
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: open ? "flex-start" : "center",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon sx={{ color: "white", minWidth: 0, justifyContent: "center" }}>
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Catálogo" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashSindra")}>
              <ListItemIcon sx={{ color: "white", minWidth: 0, justifyContent: "center" }}>
                <InfoIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Sindra" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/contato")}>
              <ListItemIcon sx={{ color: "white", minWidth: 0, justifyContent: "center" }}>
                <MailIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Contato" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;

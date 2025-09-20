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
  Divider,
} from "@mui/material";

import {
  Menu as MenuIcon,
  MenuBook,
  AutoStories,
  Mail as MailIcon,
} from "@mui/icons-material";

const drawerWidthOpen = 151;
const drawerWidthClosed = 60;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
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
          backgroundColor: "#3f4d67",
          color: "#fff",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
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
          overflowY: open ? "auto" : "hidden",
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
              <ListItemIcon
                sx={{ color: "white", minWidth: 0, justifyContent: "center" }}
              >
                <MenuBook />
              </ListItemIcon>
              {open && <ListItemText primary="Catálogo" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              bgcolor: "rgba(255,255,255,0.3)",
              height: "1px",
              alignSelf: "stretch",
            }}
          />

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashSindra")}>
              <ListItemIcon
                sx={{ color: "white", minWidth: 0, justifyContent: "center" }}
              >
                <AutoStories />
              </ListItemIcon>
              {open && <ListItemText primary="Sindra" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              bgcolor: "rgba(255,255,255,0.3)",
              height: "1px",
              alignSelf: "stretch",
            }}
          />

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/contato")}>
              <ListItemIcon
                sx={{ color: "white", minWidth: 0, justifyContent: "center" }}
              >
                <MailIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Contato" sx={{ ml: 2 }} />}
            </ListItemButton>
          </ListItem>
          <Divider
            sx={{
              bgcolor: "rgba(255,255,255,0.3)",
              height: "1px",
              alignSelf: "stretch",
            }}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;

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
import { Menu as MenuIcon, MenuBook, AutoStories } from "@mui/icons-material";

const drawerWidthOpen = 151;
const drawerWidthClosed = 60;

const navItems = [
  { text: "Catálogo", icon: <MenuBook />, path: "/" },
  { text: "Sindra", icon: <AutoStories />, path: "/dashSindra" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const drawerStyles = {
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
  };

  const listItemIconStyles = { color: "white", minWidth: 0, justifyContent: "center" };

  return (
    <Drawer variant="permanent" sx={drawerStyles}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "64px !important" }}>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Box sx={{ flexGrow: 1, overflowY: open ? "auto" : "hidden" }}>
        <List sx={{ display: "flex", flexDirection: "column", alignItems: open ? "flex-start" : "center" }}>
          {navItems.map((item,) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon sx={listItemIconStyles}>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
                </ListItemButton>
              </ListItem>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", height: "1px", alignSelf: "stretch" }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;

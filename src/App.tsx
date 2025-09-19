import React from "react";
import { Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashIBGE";
import DashSindra from "./pages/dashSindra";

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashSindra" element={<DashSindra />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

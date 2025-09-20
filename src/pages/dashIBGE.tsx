import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import TabelaIBGE from "../components/tabelaIBGE";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        mt={-10}
        mb={12}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "#32588b", fontWeight: "bold" }}
        >
          CATÁLOGO DE AGREGADOS - IBGE
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#32588b", fontWeight: "medium" }}
        >
          Dados sobre áreas urbanizadas
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TabelaIBGE />
      )}
    </Box>
  );
};

export default Dashboard;

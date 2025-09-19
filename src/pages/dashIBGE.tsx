import React from "react";
import { Box, Typography } from "@mui/material";
import TabelaIBGE from "../components/tabelaIBGE";

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Catálogo de Agregados - IBGE
        </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Dados sobre áreas urbanizadas
      </Typography>
      <TabelaIBGE />
    </Box>
  );
};

export default Dashboard;

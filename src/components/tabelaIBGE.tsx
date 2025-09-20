import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";

interface Agregado {
  id: string;
  nome: string;
}

interface AreaUrbanizada {
  id: string;
  nome: string;
  agregados: Agregado[];
}

const TabelaIBGE: React.FC = () => {
  const [dados, setDados] = useState<AreaUrbanizada[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2020, 0));

  const [filterId, setFilterId] = useState("");
  const [filterNome, setFilterNome] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchData = async (periodo: string) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v3/agregados?periodo=P5[${periodo}]`
      );
      const data = await response.json();
      setDados(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const ano = selectedDate.getFullYear();
      const mes = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const periodo = `${ano}${mes}`;
      fetchData(periodo);
    }
  }, [selectedDate]);

  const renderStatus = (nome: string) => {
    const encerrada = /série encerrada/i.test(nome);
    return encerrada ? "Série Encerrada" : "Série Ativa";
  };

  const filteredData = dados
    .filter((area) => (filterId ? area.id === filterId : true))
    .filter((area) => (filterNome ? area.nome === filterNome : true));

  const allIds = Array.from(new Set(dados.map((area) => area.id)));
  const allNomes = Array.from(new Set(dados.map((area) => area.nome)));
  const allStatus = Array.from(
    new Set(dados.flatMap((area) => area.agregados.map((agregado) => renderStatus(agregado.nome))))
  );

  return (
    <Box>
      {/* Seleção de Data */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <CalendarTodayIcon />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker
            views={["year", "month"]}
            label="Selecionar Ano e Mês"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </Box>

      {/* Tabela */}
      <TableContainer component={Paper}>
        <Table>
          {/* Cabeçalho */}
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Nome</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Agregado</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
            </TableRow>

            {/* Linha de filtros - agora abaixo dos títulos */}
            <TableRow>
              {/* Filtro ID */}
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={filterId}
                    onChange={(e) => setFilterId(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {allIds.map((id) => (
                      <MenuItem key={id} value={id}>
                        {id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              {/* Filtro Nome */}
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={filterNome}
                    onChange={(e) => setFilterNome(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {allNomes.map((nome) => (
                      <MenuItem key={nome} value={nome}>
                        {nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              {/* Espaço Agregado */}
              <TableCell>
                <Box sx={{ height: 40 }} />
              </TableCell>

              {/* Filtro Status */}
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {allStatus.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Corpo da Tabela */}
          <TableBody>
            {filteredData.map((area) =>
              area.agregados
                .filter((agregado) =>
                  filterStatus ? renderStatus(agregado.nome) === filterStatus : true
                )
                .map((agregado) => (
                  <TableRow key={`${area.id}-${agregado.id}`}>
                    <TableCell>{area.id}</TableCell>
                    <TableCell>{area.nome}</TableCell>
                    <TableCell>{agregado.nome}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            renderStatus(agregado.nome) === "Série Encerrada"
                              ? "#ffebee"
                              : "#e8f5e9",
                          color:
                            renderStatus(agregado.nome) === "Série Encerrada"
                              ? "#b71c1c"
                              : "#1b5e20",
                          fontWeight: "bold",
                          p: "4px 8px",
                          borderRadius: 1,
                          display: "inline-block",
                          minWidth: "80px",
                          textAlign: "center",
                        }}
                      >
                        {renderStatus(agregado.nome)}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TabelaIBGE;

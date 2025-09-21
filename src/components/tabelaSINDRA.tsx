import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, MenuItem, Select, FormControl, } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";

interface Valor {
  D2N: string;
  D3N: string;
  D4N: string;
  V: number | string;
}

const CORES_VALOR = {
  positivo: { background: "#e8f5e9", color: "#1b5e20" },
  negativo: { background: "#ffebee", color: "#b71c1c" },
  indisponivel: { background: "#eeeeee", color: "#757575" },
};

const removeLinhasIndisponiveis = (dados: Valor[]) =>
  dados.filter(
    (item) =>
      !(
        (!item.D4N || item.D4N.trim() === "") &&
        (item.V === "Valor Indisponível" || item.V === "...")
      )
  );

const TabelaSindra: React.FC = () => {
  const [dados, setDados] = useState<Valor[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2020, 0));

  const [filterVariavel, setFilterVariavel] = useState("");
  const [filterPeriodo, setFilterPeriodo] = useState("");
  const [filterSubcategoria, setFilterSubcategoria] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://apisidra.ibge.gov.br/values/t/1419/n1/all/v/all/p/all/c315/7169,7170,7445,7486,7558,7625,76"
      );
      const data = await response.json();

      const parsed: Valor[] = data
        .filter((item: any) => !(item.D2N === "Variável" && item.D3N === "Mês"))
        .map((item: any) => ({
          D2N: item.D2N,
          D3N: item.D3N,
          D4N: item.D4N,
          V: item.V === "..." ? "Valor Indisponível" : parseFloat(item.V),
        }));

      setDados(removeLinhasIndisponiveis(parsed));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = dados
    .filter((item) => (filterVariavel ? item.D2N === filterVariavel : true))
    .filter((item) => (filterPeriodo ? item.D3N === filterPeriodo : true))
    .filter((item) => (filterSubcategoria ? item.D4N === filterSubcategoria : true));

  const allVariaveis = Array.from(new Set(dados.map((d) => d.D2N).filter(Boolean)));
  const allPeriodos = Array.from(new Set(dados.map((d) => d.D3N).filter(Boolean)));
  const allSubcategorias = Array.from(new Set(dados.map((d) => d.D4N).filter(Boolean)));

  return (
    <Box>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <DatePicker
            views={["year", "month"]}
            label="Selecionar Ano e Mês"
            value={selectedDate}
            onChange={setSelectedDate}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["Variável", "Período", "Subcategoria", "Valor"].map((title) => (
                <TableCell key={title}>
                  <Typography fontWeight="bold">{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    value={filterVariavel}
                    displayEmpty
                    onChange={(e) => setFilterVariavel(e.target.value)}
                  >
                    <MenuItem value="">Todas as Variáveis</MenuItem>
                    {allVariaveis.map((v) => (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    value={filterPeriodo}
                    displayEmpty
                    onChange={(e) => setFilterPeriodo(e.target.value)}
                  >
                    <MenuItem value="">Todos os Períodos</MenuItem>
                    {allPeriodos.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell>
                <FormControl fullWidth size="small">
                  <Select
                    value={filterSubcategoria}
                    displayEmpty
                    onChange={(e) => setFilterSubcategoria(e.target.value)}
                  >
                    <MenuItem value="">Todas as Subcategorias</MenuItem>
                    {allSubcategorias.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((item, idx) => {
              const cores =
                typeof item.V === "number"
                  ? item.V < 0
                    ? CORES_VALOR.negativo
                    : CORES_VALOR.positivo
                  : CORES_VALOR.indisponivel;

              return (
                <TableRow key={idx} hover>
                  <TableCell>{item.D2N}</TableCell>
                  <TableCell>{item.D3N}</TableCell>
                  <TableCell>{item.D4N}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        backgroundColor: cores.background,
                        color: cores.color,
                        fontWeight: "bold",
                        p: "4px 8px",
                        borderRadius: "16px",
                        display: "inline-block",
                        minWidth: "80px",
                        textAlign: "right",
                      }}
                    >
                      {typeof item.V === "number" ? item.V.toFixed(3) : item.V}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TabelaSindra;

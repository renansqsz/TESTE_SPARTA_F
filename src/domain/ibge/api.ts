import axios from "axios";

export const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3",
});

export const apiSidra = axios.create({
  baseURL: "https://apisidra.ibge.gov.br",
});

export interface Serie {
  id: string;
  localidade: string;
}

export interface IBGEDados {
  id: string;
  titulo: string;
  unidades: string[];
  series: Serie[];
}

export interface ValorDescritoPorSuasDimensoes {
  D1C: string;
  D1N: string;
  D2C: string;
  D2N: string;
  D3C: string;
  D3N: string;
  D4C: string;
  D4N: string;
  MC: string;
  MN: string;
  NC: string;
  NN: string;
  V: string;
}

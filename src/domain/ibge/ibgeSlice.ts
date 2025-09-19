import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiIBGE } from "./api";
import type { IBGEDados } from "./api";

export const fetchIBGEDados = createAsyncThunk(
  "ibge/fetchIBGEDados",
  async (periodo: string) => {
    const response = await apiIBGE.get<IBGEDados[]>(
      `/agregados?periodo=P5[${periodo}]`
    );
    return response.data;
  }
);

interface IBGEState {
  data: IBGEDados[] | [];
  loading: boolean;
  error: string | null;
}

const initialState: IBGEState = {
  data: [],
  loading: false,
  error: null,
};

const ibgeSlice = createSlice({
  name: "ibge",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIBGEDados.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIBGEDados.fulfilled, (state, action: PayloadAction<IBGEDados[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIBGEDados.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar dados do IBGE";
      });
  },
});

export default ibgeSlice.reducer;

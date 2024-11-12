/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  game: {},
  bingoTable: {},
  error: "",
  isLoading: false,
  isJoin: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.game = action.payload;
      state.error = null;
    },

    setBingoTable: (state, action) => {
      state.bingoTable = action.payload;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.user = null;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsJoin: (state, action) => {
      state.isJoin = action.payload;
    },
  },
});

export const { setGame, setError, setIsLoading, setIsJoin, setBingoTable } =
  gameSlice.actions;

export default gameSlice.reducer;

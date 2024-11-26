/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  game: {},
  bingoTable: {},
  games: [],
  users: [],
  bingoBalls: [],
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

    setAllGames: (state, action) => {
      state.games = action.payload;
      state.error = null;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
      state.error = null;
    },

    setBingoTable: (state, action) => {
      state.bingoTable = action.payload;
      state.error = null;
    },

    setBingoBalls: (state, action) => {
      state.bingoBalls = action.payload;
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

    resetState: () => initialState,
  },
});

export const {
  setGame,
  setError,
  setIsLoading,
  setIsJoin,
  setBingoTable,
  setBingoBalls,
  setAllGames,
  resetState,
  setUsers,
} = gameSlice.actions;

export default gameSlice.reducer;

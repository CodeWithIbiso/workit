import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isTrial: false,
  favourites: [],
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsTrial: (state, action) => {
      state.isTrial = action.payload;
    },
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    logout: (state, action) => {
      state.user = {};
      state.favourites = [];
    },
  },
});

export const { setUser, setFavourites, logout, setIsTrial } = appSlice.actions;

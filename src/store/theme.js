import { createSlice } from "@reduxjs/toolkit";
const theme=localStorage.getItem("theme");
const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: theme || "light"},
  reducers: {
    changeTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
        localStorage.setItem("theme","dark")
      }
      else{
        state.theme = "light"
        localStorage.setItem("theme","light");
      }
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;

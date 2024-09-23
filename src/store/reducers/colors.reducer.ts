import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IColorScheme } from "../../models/colorScheme";
import { themes } from "../../constants/colors";

export interface ColorState {
  colors: IColorScheme;
}

const initialState: ColorState = {
  colors: themes.dark!,
};
type ThemeKeys = keyof typeof themes;
export const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    switchColors(state, action: PayloadAction<ThemeKeys>) {
      return { colors: themes[action.payload] };
    },
  },
});

export const colorsActions = colorsSlice.actions;
export const colorsReducer = colorsSlice.reducer;

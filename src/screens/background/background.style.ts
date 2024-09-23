import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.barsColor,
    },
  });

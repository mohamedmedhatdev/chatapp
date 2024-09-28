import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    animatedView: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
    },
    viewContainer: {
      borderLeftWidth: 5,
      borderLeftColor: "yellow",
      flex: 1,
      justifyContent: "center",
    },
    nameTitle: {
      paddingLeft: 10,
      color: "yellow",
      fontWeight: "bold",
    },
    message: {
      color: "white",
      paddingLeft: 10,
    },
    closeButton: {
      backgroundColor: colors.accentColor,
      padding: 5,
      borderRadius: 100,
      marginRight: 10,
    },
  });

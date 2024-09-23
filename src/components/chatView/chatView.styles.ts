import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    topBarContainer: {
      height: 100,
      justifyContent: "center",
      backgroundColor: colors.barsColor,
    },
    topBarText: {
      marginTop: 30,
      color: "white",
      fontSize: 24,
      textAlign: "center",
    },
    bottomBarContainer: {
      height: 70,
      padding: 10,
      backgroundColor: colors.barsColor,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottomBarText: {
      width: "80%",
      backgroundColor: colors.inputColor,
      height: 40,
      borderRadius: 20,
      color: "white",
      padding: 10,
    },
    sendButton: {
      width: 40,
      height: 40,
      backgroundColor: colors.accentColor,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },
  });

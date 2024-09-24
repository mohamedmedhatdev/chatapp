import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    messagesScrollView: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.chatBackgroundColor,
      overflow: "hidden",
    },
    topBarContainer: {
      height: 100,
      backgroundColor: colors.barsColor,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 30,
    },
    topBarText: {
      color: "white",
      fontSize: 24,
    },
    bottomBarContainer: {
      height: 70,
      padding: 10,
      backgroundColor: colors.barsColor,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    bottomBarInput: {
      width: "70%",
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

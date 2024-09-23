import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    messagesScrollView: {
      flex: 1,
      backgroundColor: colors.chatBackgroundColor,
      overflow: "hidden",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    topBarContainer: {
      height: 100,
      justifyContent: "center",
      backgroundColor: colors.barsColor,
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 30,
    },
    topBarText: {
      color: "white",
      fontSize: 24,
      marginRight: "auto",
      width: "100%",
      textAlign: "center",
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

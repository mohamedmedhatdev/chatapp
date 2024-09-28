import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    messagesScrollView: {
      flex: 1,
      padding: 20,
      zIndex: 0,
      position: "relative",
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
      marginLeft: 20,
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
    blurContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      flex: 1,
      zIndex : 1
    },
  });

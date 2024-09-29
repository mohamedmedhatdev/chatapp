import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (isSender: boolean, colors: IColorScheme) =>
  StyleSheet.create({
    root: {
      alignSelf: isSender ? "flex-end" : "flex-start",
      maxWidth: "80%",
      overflow: "visible",
      marginTop: 10,
      padding: 13,
      borderRadius: 15,
      borderBottomRightRadius: isSender ? 0 : 15,
      borderBottomLeftRadius: !isSender ? 0 : 15,
      backgroundColor: isSender
        ? colors.senderMessageColor
        : colors.recepientMessageColor,
    },
    timeStamp: {
      color: "white",
      alignSelf: isSender ? "flex-end" : "flex-start",
      fontSize: 10,
      marginTop: 10,
    },
    baseMsgContainer: {
      borderLeftWidth: 5,
      borderLeftColor: "yellow",
      justifyContent: "center",
      marginBottom: 10,
      backgroundColor: colors.accentColor,
      padding: 10,
      borderRadius: 5,
    },
    baseMsgTitleText: {
      paddingLeft: 10,
      color: "yellow",
      fontWeight: "bold",
    },
    reaction: {
      position: "absolute",
      width: 30,
      height: 30,
      backgroundColor: colors.barsColor,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      zIndex: 10,
      bottom: -20,
      [isSender ? "left" : "right"]: -20,
    },
    attachment: {
      width: "100%",
      height: 60,
      backgroundColor: colors.inputColor,
      borderRadius: 10,
      flexDirection: "row",
      padding: 10,
    },
  });

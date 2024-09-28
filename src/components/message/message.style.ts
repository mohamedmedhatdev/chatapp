import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (isSender: boolean, colors: IColorScheme) =>
  StyleSheet.create({
    root: {
      alignSelf: isSender ? "flex-end" : "flex-start",
      maxWidth: "80%",
      overflow : "visible",
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
  });

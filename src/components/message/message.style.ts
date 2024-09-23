import { StyleSheet } from "react-native";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (isSender: boolean, colors: IColorScheme) =>
  StyleSheet.create({
    root: {
      alignSelf: isSender ? "flex-end" : "flex-start",
      overflow: "hidden",
      maxWidth: "80%",
      marginTop: 10,
      borderTopLeftRadius: isSender ? 100 : 0,
      borderBottomLeftRadius: isSender ? 100 : 0,
      borderTopRightRadius: isSender ? 0 : 100,
      borderBottomRightRadius: isSender ? 0 : 100,
      padding: 13,
      borderRadius: 100,
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

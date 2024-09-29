import { StyleSheet } from "react-native";
import { REACTION_BAR_WIDTH } from "../../constants";
import { IColorScheme } from "../../models/colorScheme";

export const styles = (colors: IColorScheme) =>
  StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      padding: 10,
      position: "absolute",
      zIndex: 100,
      height: 60,
      width: REACTION_BAR_WIDTH,
      backgroundColor: colors.chatBackgroundColor,
      top: -70,

      borderRadius: 20,
    },
  });

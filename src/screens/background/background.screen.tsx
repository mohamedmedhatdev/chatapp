import React, { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./background.style";

interface IBackgroundScreenProps {
  children?: ReactNode;
}
export const BackgroundScreen: React.FC<React.PropsWithChildren> = (
  props: IBackgroundScreenProps
) => {
  return <View style={styles.root}>{props.children}</View>;
};

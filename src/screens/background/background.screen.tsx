import React, { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./background.style";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface IBackgroundScreenProps {
  children?: ReactNode;
}
export const BackgroundScreen: React.FC<React.PropsWithChildren> = (
  props: IBackgroundScreenProps
) => {
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return <View style={styles(colors).root}>{props.children}</View>;
};

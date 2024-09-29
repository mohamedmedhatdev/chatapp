import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./reactionsBar.style";

interface IReactionBarProps {
  onReact: (r: string) => void;
}

export const ReactionsBar = (props: IReactionBarProps) => {
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return (
    <View style={styles(colors).root}>
      <TouchableOpacity onPress={() => props.onReact("😂")}>
        <Text style={{ fontSize: 40 }}>😂</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onReact("🤬")}>
        <Text style={{ fontSize: 40 }}>🤬</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.onReact("❤")}>
        <Text style={{ fontSize: 40 }}>❤️</Text>
      </TouchableOpacity>
    </View>
  );
};

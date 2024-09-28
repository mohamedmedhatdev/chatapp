import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IReactionBarProps {
  onReact: (r: string) => void;
}

export const ReactionsBar = (props: IReactionBarProps) => {
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
        position: "absolute",
        zIndex: 100,
        height: 60,
        width: 200,
        backgroundColor: colors.chatBackgroundColor,
        top: -70,
        left: 0,
        right: 0,
        borderRadius: 20,
      }}
    >
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

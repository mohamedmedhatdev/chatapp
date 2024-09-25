import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { IChat } from "../../models/chat.model";
import { View } from "react-native";
import { TextField } from "../form/inputField";
import { styles } from "./chatView.styles";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../store/store";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface IChatTopBarProps {
  chat: IChat;
  form: any;
}
export const ChatTopBar = ({ chat, form }: IChatTopBarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const colors = useSelector((state: RootState) => state.colorsReducer.colors);
  return (
    <View style={styles(colors).topBarContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
        {!showSearch && (
          <Text style={styles(colors).topBarText}>{chat.recipiant.name}</Text>
        )}
      </View>
      {!showSearch && (
        <Animated.View
          exiting={ZoomOut.duration(150)}
          entering={ZoomIn.duration(150)}
        >
          <TouchableOpacity
            onPress={() => {
              setShowSearch(true);
            }}
          >
            <Ionicons
              name="search"
              size={30}
              color="white"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      {showSearch && (
        <Animated.View
          entering={ZoomIn.delay(70).duration(150)}
          exiting={ZoomOut.duration(150)}
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TextField
            style={{
              backgroundColor: colors.inputColor,
              width: "80%",
              height: 40,
              borderRadius: 10,
              color: "white",
              padding: 10,
            }}
            placeholder="Type something to search for..."
            placeholderTextColor={"gray"}
            control={form.control}
            name="search"
          />
          <TouchableOpacity
            onPress={() => {
              setShowSearch(false);
              form.setValue("search", "");
            }}
            style={{
              backgroundColor: colors.accentColor,
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Ionicons name="close" size={25} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

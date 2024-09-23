import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BackgroundScreen } from "./src/screens/background/background.screen";

export default function App() {
  return (
    <BackgroundScreen>
      <View style={{ height: 60 }}></View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopEndRadius: 100,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            overflow: "hidden",
            maxWidth : "80%",
            marginTop: 50,
            borderTopLeftRadius : 0,
            borderBottomLeftRadius : 0,
            padding: 10,
            borderRadius: 100,
            backgroundColor : "rgba(200,200,200,1)"
          }}
        >
          <Text >TEST ME sadasdekrjkwejrkwejrk[jksdfjkdsjfjsdkfjkdsfjksdkfjkdskfjkdsfjkdsfjNOW TEST ME NOW</Text>
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            overflow: "hidden",
            maxWidth : "80%",
            marginTop: 10,
            borderTopRightRadius : 0,
            borderBottomRightRadius : 0,
            padding: 10,
            borderRadius: 100,
            backgroundColor : "rgba(200,200,200,1)"
          }}
        >
          <Text >TEST ME sadasdekrjkwejrkwejrk[jksdfjkdsjfjsdkfjkdsfjksdkfjkdskfjkdsfjkdsfjNOW TEST ME NOW</Text>
        </View>
      </ScrollView>
      <View style={{ height: 60 }}></View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

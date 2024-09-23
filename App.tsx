import { StyleSheet } from "react-native";
import { BackgroundScreen } from "./src/screens/background/background.screen";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ChatView } from "./src/components/chatView/chatView";

export default function App() {
  return (
    <Provider store={store}>
      <BackgroundScreen>
        <ChatView
          chat={{
            chatId: 0,
            recipiant: { id: 2, name: "Ahmed" },
            messages: [
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 1,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
              {
                senderId: 2,
                content: {
                  type: "text",
                  content: "THIS IS A MESSAGE",
                },
                timeStamp: new Date(),
              },
            ],
          }}
        />
      </BackgroundScreen>
    </Provider>
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

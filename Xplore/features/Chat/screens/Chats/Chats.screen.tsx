import { useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useQuery } from "react-query";
import api from "../../../../services/appwrite/api";
import { COLLECTION_ID_DIRECT_CHATS } from "@env";
import { Query } from "appwrite";
import { useThemeColor } from "../../../../hooks";
import ChatBox from "./components/ChatBox/ChatBox.component";
import TopHeader from "../../../../navigation/TopHeader.component";
import { NavigationProp } from "@react-navigation/native";
import { View } from "../../../../components";
import styles from "./Chats.styles";

interface ChatsProps {
  navigation: NavigationProp<any>;
}

const Chats = (props: ChatsProps) => {
  const { navigation } = props;
  const background = useThemeColor("background");
  const backgroundSecondary = useThemeColor("backgroundSecondary");
  const [chats, setChats] = useState<any | null>(null);

  // Quering current user's data
  const { data: userdata } = useQuery("user data", () => api.getAccount());
  let userId: string = userdata?.$id as string;

  // Quering chats
  const { data: chatData } = useQuery("chat data", () =>
    api.listDocuments(COLLECTION_ID_DIRECT_CHATS, [
      Query.equal("userID", userId),
    ])
  );

  useEffect(() => {
    setChats(
      chatData?.documents?.map((doc: any) => ({
        chatIndex: doc.$id,
        chatID: doc.chatID,
        userID: doc.userID,
        contactID: doc.contactID,
        lastMessage: doc.lastMessage,
        updatedAt: doc.$updatedAt.slice(0, 10),
      }))
    );
  }, [chatData?.documents]);

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, { backgroundColor: backgroundSecondary }]}
    >
      <TopHeader screenName={"Messages"} navigation={navigation} />
      <ScrollView
        style={[styles.chat_scrollView, { backgroundColor: background }]}
      >
        <View backgroundColor="background" style={styles.chat_container}>
          {chats &&
            chats?.map((chat: any) => (
              <ChatBox
                key={chat.chatIndex}
                image="https://picsum.photos/200"
                username={chat.userID}
                lastText={chat.lastMessage}
                time={chat.updatedAt}
                onPress={() =>
                  props.navigation.navigate("ChatDetails", {
                    chatID: chat.chatID,
                  })
                }
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chats;

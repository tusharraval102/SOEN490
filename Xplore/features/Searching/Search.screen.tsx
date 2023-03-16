import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Icon, SearchBar, UsersList, View, Text } from "../../components";
import { useThemeColor } from "../../hooks/useThemeColor";
import { useListUsers } from "../../services/api/search";
import styles from "./Search.styles";

interface SearchProps {
  navigation: NavigationProp<any>;
}

// interface UsersType {
//   id: string;
//   username: string;
//   avatar: string;
//   xp: number;
// }

// const Users: UsersType[] = [
//   {
//     id: "1",
//     username: "Josh Lewis",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "2",
//     username: "Amy Lucas",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "3",
//     username: "Landon Clayton",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "4",
//     username: "Elva Moore",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "5",
//     username: "Martin Garza",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "6",
//     username: "Bernice Lewis",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "7",
//     username: "Landon Clayton",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
//   {
//     id: "8",
//     username: "Martin Garza",
//     avatar: "https://picsum.photos/200",
//     xp: 103597,
//   },
// ];

const Search = (props: SearchProps) => {
  const { navigation } = props;
  const background = useThemeColor("background");
  const [query, setQuery] = useState<string>(""); // Add state for the search query

  const Users = useListUsers();
  console.log(Users);

  // Filter the Users array based on the search query
  const filteredUsers = Users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, { backgroundColor: background }]}
    >
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.arrowIcon} name="chevron-left" />
        </TouchableOpacity>
        <SearchBar onQueryChange={setQuery} />
      </View>
      <View style={styles.resultsContainer}>
        {filteredUsers.length === 0 ? (
          <View style={styles.noResultsView}>
            <Text variant="h4" color="bodyText">
              No results found!{" "}
              <Icon name="meh" size="medium" color="primary" />
            </Text>
          </View>
        ) : (
          <UsersList
            data={filteredUsers}
            selectUserList={false}
            messageUserList={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

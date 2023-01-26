import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
    alignItems: "center",
  },
  searchBar: {
    width: 320,
  },
});

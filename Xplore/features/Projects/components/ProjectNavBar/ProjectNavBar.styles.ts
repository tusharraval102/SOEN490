import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: -220,
    width: width,
  },
  headerScroll: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  mainItem_scrollView: {
    flex: 1,
    paddingBottom: 300,
  },
  mainItem: {
    width: width,
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerActiveBar: {
    height: 4,
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  headerBar: {
    height: 2,
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
});

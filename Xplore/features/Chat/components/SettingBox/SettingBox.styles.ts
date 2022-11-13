import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { multiplier } from "../../../../constants";

export default StyleSheet.create({
  settingBox_container: {
    width: 320,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 10 * multiplier : 10,
    marginHorizontal: 15,
    marginTop: 25,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    position: "absolute",
    right: 10,
  },
});

import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Text, Icon } from "../../../components";
import { colors } from "../../../constants";

const ProfileInfo = () => {
  return (
    <View>
      <View style={styles.ProfileIcons}>
        <View style={styles.IconContainer}>
          <Icon
            name="moon"
            color="primary"
            size="large"
            style={styles.Darkmode}
          />
        </View>

        <Icon
          name="bell"
          color="primary"
          size="large"
          style={styles.Bell}
        ></Icon>
      </View>
      <View style={styles.RedDot}></View>
      <View style={styles.ProfileInfo}>
        <Text
          variant="h2"
          style={{ marginTop: 40 }}
          lightColor={colors.light.titleTextColor}
        >
          Josh Lewis
        </Text>
        <Text lightColor={colors.light.bodyText}>
          <Icon name="map-pin" color="icon" size="medium" /> Montreal, Quebec
        </Text>
        <Text
          lightColor={colors.light.bodyText}
          style={{ marginTop: 5, marginBottom: 20 }}
        >
          <Icon name="zap" color="icon" size="medium" /> 103,597 XP
        </Text>
        <View style={styles.Rec}>
          <View style={styles.BiggerRectangle}>
            <View style={styles.Rectangle} />
          </View>
          <View style={styles.Description}>
            <Text
              variant="body"
              lightColor={colors.light.bodyText}
              style={{ marginTop: 5 }}
            >
              980/1000{" "}
              <Text variant="h4" lightColor={colors.light.bodyText}>
                XP
              </Text>
            </Text>
            <View>
              <Text
                variant="body"
                lightColor={colors.light.bodyText}
                style={{ marginTop: 5 }}
              >
                <Text variant="h4" lightColor={colors.light.bodyText}>
                  30 XP
                </Text>{" "}
                to level up
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.Boxes}>
          <View style={styles.Box}>
            <Text variant="h2">5</Text>
            <Text variant="smBody" lightColor={colors.light.bodyText}>
              Levels
            </Text>
          </View>
          <View style={styles.Box}>
            <Text variant="h2">8</Text>
            <Text variant="smBody" lightColor={colors.light.bodyText}>
              Badges
            </Text>
          </View>
          <View style={styles.Box}>
            <Text variant="h2">12</Text>
            <Text variant="smBody" lightColor={colors.light.bodyText}>
              Projects
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.Avatar}>
        <Avatar.Image size={140} source={require("../../../assets/Josh.png")} />
        <View style={styles.EditContainer}>
          <Icon name="edit" color="primary" size="large" />
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  ProfileInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    backgroundColor: colors.light.backgroundSecondary,
    marginTop: 70,
    paddingTop: 40,
  },
  Avatar: {
    alignSelf: "center",
    position: "absolute",
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: colors.light.backgroundSecondary,
    borderWidth: 8,
    borderColor: colors.light.backgroundSecondary,
  },
  ProfileIcons: {
    flexDirection: "row",
    marginTop: 10,
  },
  Darkmode: {
    marginLeft: 2,
  },
  Bell: {
    flexDirection: "row",
    marginLeft: 270,
  },

  Rec: {
    marginTop: 20,
  },
  BiggerRectangle: {
    width: 350,
    height: 5,
    backgroundColor: colors.light.background,
    borderRadius: 100,
  },
  Rectangle: {
    width: 100 * 2,
    height: 5,
    backgroundColor: colors.light.primary,
    borderRadius: 100,
  },
  Boxes: {
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 10,
  },
  Box: {
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 70,
    backgroundColor: colors.light.background,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  IconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.light.icon,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginLeft: 40,
  },
  EditContainer: {
    width: 30,
    height: 30,
    backgroundColor: colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
    borderWidth: 4,
    borderColor: colors.light.backgroundSecondary,
    marginTop: -30,
    marginLeft: 105,
  },
  Description: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  RedDot: {
    flexDirection: "row",
    width: 9,
    height: 9,
    backgroundColor: "red",
    borderRadius: 50,
    marginLeft: 366,
    marginTop: -29,
  },
});

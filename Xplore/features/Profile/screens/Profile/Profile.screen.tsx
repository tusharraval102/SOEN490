import { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Icon, Text, Avatar } from "../../../../components";
import { useAuth, useThemeColor } from "../../../../hooks";
import { deviceScreenWidth } from "../../../../constants";
import {
  Badges,
  ProjectSlider,
  UserProgress,
  StatBoxes,
} from "../../components";
import { LogoutButton } from "../../components/Logout/LogoutButton/LogoutButton.component";
import { useQuery } from "react-query";
import api from "../../../../services/appwrite/api";
import styles from "./Profile.styles";
import { getUserInfo } from "../../api/user";
import { BUCKET_PROFILE_PIC } from "@env";
import { useFetchUserDetails } from "../../../../services/api/userProfile";
import { useNewNotificationsCount } from "../../../../services/api/notifications";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { getUserXPlevel } from "../../../../utils/getUserXPlevel";

const headerHeight = 300;
const headerFinalHeight = 160;
const imageSize = (headerHeight / 3) * 2;

interface ProfileProps {
  navigation: NavigationProp<any>;
}

const Profile = (props: ProfileProps) => {
  const { navigation } = props;
  const whiteBackground = useThemeColor("backgroundSecondary");
  const generalGray = useThemeColor("generalGray");
  const { sessionToken } = useAuth();
  const [userId] = useState<string>(sessionToken?.userId!);
  const [profilePictureId, setProfilePictureId] = useState<string>();

  const scrollY = useRef(new Animated.Value(0)).current;
  const offset = headerHeight - headerFinalHeight;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -offset],
    extrapolate: "clamp",
  });
  const translateImageY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
    extrapolate: "clamp",
  });
  const translateImageX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [
      0,
      -(deviceScreenWidth / 2) + (imageSize * headerFinalHeight) / headerHeight,
    ],
    extrapolate: "clamp",
  });
  const scaleImage = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, headerFinalHeight / headerHeight],
    extrapolate: "clamp",
  });

  const translateInfoX = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [0, 60],
    extrapolate: "clamp",
  });
  const translateInfoY = scrollY.interpolate({
    inputRange: [0, offset],
    outputRange: [1, -40],
    extrapolate: "clamp",
  });

  const { data, status } = useFetchUserDetails();
  const userDetails = data?.documents[0];
  const XPlevel = getUserXPlevel(userDetails?.xp);
  const { data: userPrefs } = useQuery("user prefs", () =>
    api.getUserPreferences()
  );
  const newNotifsCount = useNewNotificationsCount(userPrefs?.$id);

  const { data: userObject } = useQuery("user", () => getUserInfo(userId));

  useEffect(() => {
    setProfilePictureId(userObject?.profilePicture);
  }, [userObject]);

  const { data: profilePicture } = useQuery(
    "profile picture",
    () =>
      api.getFilePreview(
        BUCKET_PROFILE_PIC,
        profilePictureId ?? "642349fae9ecff15d018"
      ),
    {
      // This query will only run if "profilePictureId" is valid
      enabled: !!profilePictureId,
    }
  );

  return status === "loading" ? (
    <Spinner visible={true} />
  ) : (
    <SafeAreaView
      style={[styles.safeAreaStyle, { backgroundColor: whiteBackground }]}
    >
      <ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* THIS IS EVERYTHING BELOW THE ANIMATED HEADER */}
        <View style={styles.belowHeaderContainer}>
          <UserProgress xp={userDetails?.xp} />
          <StatBoxes
            numBadges={XPlevel}
            numProjects={userDetails?.projects.length}
            xpLevel={XPlevel}
          />
          <Badges xpLevel={XPlevel} />
          <ProjectSlider projectIDs={userDetails?.projects} />

          <View style={styles.logoutButton}>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>

      {/* ANIMATED HEADER OF USER PROFILE */}
      <Animated.View
        // pointerEvents="none"
        style={[
          styles.header,
          {
            transform: [{ translateY: translateHeader }],
            backgroundColor: whiteBackground,
            borderBottomColor: generalGray,
            height: headerHeight,
          },
        ]}
      >
        <View style={styles.topHeaderButtons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
          >
            <Icon name="settings" color="primary" size="large" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Icon name="bell" color="primary" size="large" />
            {newNotifsCount > 0 ? (
              <Image
                source={require("../../../../assets/newNotifs.png")}
                style={styles.newNotificationIcon}
              />
            ) : null}
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            {
              transform: [
                { translateY: translateImageY },
                { translateX: translateImageX },
                { scale: scaleImage },
              ],
            },
          ]}
        >
          <Avatar size={135} name="user avatar" imageURL={profilePicture} />
        </Animated.View>

        <Animated.View
          style={[
            styles.userInfo,
            {
              transform: [
                { translateX: translateInfoX },
                { translateY: translateInfoY },
              ],
            },
          ]}
        >
          <Text variant="h2" color="titleText" style={styles.userName}>
            {userDetails?.username}
          </Text>
          <View style={styles.userInfoDetails}>
            <Icon
              name="map-pin"
              color="smallText"
              size="small"
              style={styles.userInfoIcon}
            />
            <Text variant="smBody">{userPrefs?.from}</Text>
          </View>
          <View style={styles.userInfoDetails}>
            <Icon
              name="zap"
              color="smallText"
              size="small"
              style={styles.userInfoIcon}
            />
            <Text variant="smBody">{userDetails?.xp} XP</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Profile;

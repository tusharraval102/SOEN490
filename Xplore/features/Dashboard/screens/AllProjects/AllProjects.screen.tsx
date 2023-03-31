import { FlashList } from "@shopify/flash-list";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CategoryScrollBar,
  ProjectCard,
  SearchBar,
  Text,
  View,
} from "../../../../components";
import styles from "./AllProjects.styles";
import { useListProjectsPaginated } from "../../../../services/api/projects";
import { Models } from "appwrite";
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "react-query";
import api from "../../../../services/appwrite/api";

interface ProjectData extends Models.Document {
  name: string;
  description: string;
  imageURL?: string;
  tasks: string[];
  members: string[];
  percentComplete: number;
  category: string;
  startDate: string;
  endDate: string;
  goals: string[];
}

const categories = [
  { name: "Data Science" },
  { name: "Web Development" },
  { name: "Embedded Systems" },
  { name: "Security Systems" },
  { name: "Social Networking" },
  { name: "Game Development" },
  { name: "Software Optimization" },
  { name: "Finance/Blockchain" },
  { name: "Mobile Development" },
];

const formatProjectData = (data: ProjectData | undefined, userID: any) => {
  const formattedData: ProjectData[] = [];
  data?.pages.forEach((page: { projects: ProjectData[] }) =>
    page.projects.forEach((project: ProjectData) =>
      formattedData.push(project as ProjectData)
    )
  );
  formattedData.forEach((project) => {
    let memberList = project.members;
    let foundUser = false;
    memberList.forEach(
      (memberID) => (memberID === userID ? (foundUser = true) : "") // if userID is found in list of members
    );
    project.requestJoin = !foundUser;
  });
  return formattedData;
};
interface ExploreProjectsProps {
  navigation: NavigationProp<any>;
}
const ExploreProjects = (props: ExploreProjectsProps) => {
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState<ProjectData[]>([]);

  const { data: userdata } = useQuery("user data", () => api.getAccount());
  let userId: string = userdata?.$id as string;

  const { data, status, fetchNextPage } = useListProjectsPaginated();

  let projectData = useRef([] as ProjectData[]);
  projectData.current = formatProjectData(data as any, userId);

  useEffect(() => {
    setDataToDisplay(projectData.current);
  }, [status]);

  useEffect(() => {
    const filtered = projectData.current.filter(
      (project) => project.category === categoryFilter
    );
    setDataToDisplay(filtered);
  }, [categoryFilter]);

  useEffect(() => {
    const filtered = projectData.current.filter(
      (project) =>
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDataToDisplay(filtered);
  }, [searchQuery]);

  return (
    <SafeAreaView edges={["top"]} style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitleText} variant="h2" color="titleText">
          Explore Projects
        </Text>

        <SearchBar
          searchPlaceHolder="Search for a project..."
          showFilterButton={true}
          onFilterButtonPress={setIsCategoryListVisible}
          style={styles.searchBar}
          onQueryChange={setSearchQuery}
        />
      </View>

      {isCategoryListVisible && (
        <CategoryScrollBar
          style={styles.categoryBar}
          categories={categories}
          setCategory={setCategoryFilter}
        />
      )}

      <FlashList
        data={dataToDisplay}
        renderItem={({ item }) => (
          <ProjectCard navigation={props.navigation} item={item} />
        )}
        estimatedItemSize={350}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashListContainer}
        onEndReached={fetchNextPage}
      />
    </SafeAreaView>
  );
};

export default ExploreProjects;

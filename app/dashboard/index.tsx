import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { Layout, Text, Icon, CircularProgressBar } from "@ui-kitten/components";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const CourseCard = ({ course }) => (
  <TouchableOpacity onPress={() => {
    router.push("/dashboard/course")
  }} style={styles.courseCard} activeOpacity={0.9}>
    {/*    <Image 
      source={course.image}
      style={styles.courseImage}
      resizeMode="cover"
    /> */}
    <View style={styles.courseOverlay}>
      <View style={styles.courseProgress}>
        <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
      </View>
    </View>
    <View style={styles.courseContent}>
      <View style={styles.courseCategory}>
        <Text style={styles.categoryText}>{course.category}</Text>
      </View>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseInstructor}>{course.instructor}</Text>
      <View style={styles.courseStats}>
        <Text style={styles.statText}>{course.duration}</Text>
        <View style={styles.dot} />
        <Text style={styles.statText}>{course.lessons} lessons</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const CategoryPill = ({ title, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryPill, selected && styles.selectedPill]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.pillText, selected && styles.selectedPillText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const DashboardScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollY] = useState(new Animated.Value(0));

  const categories = ["All", "Design", "Development", "Marketing", "Business"];
  const courses = [
    {
      id: "1",
      title: "UI/UX Design Principles",
      category: "Design",
      instructor: "Khalil Benkhelil",
      duration: "6h 30m",
      lessons: 12,
      progress: 75,
      /*       image: require('@/assets/images/course1.png'), */
    },
    {
      id: "2",
      title: "React Native Masterclass",
      category: "Development",
      instructor: "Khalil Benkhelil",
      duration: "8h 45m",
      lessons: 15,
      progress: 30,
      /*     image: require('@/assets/images/course2.png'), */
    },
    // Add more courses as needed
  ];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: "clamp",
  });

  return (
    <Layout style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>khalilbk</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <CircularProgressBar progress={0.89} status="success" />
            <Text style={styles.statLabel}>Courses in Progress</Text>
          </View>
          <View style={styles.statCard}>
            
          <CircularProgressBar progress={0.70} status={"info"} />
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((category) => (
              <CategoryPill
                key={category}
                title={category}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.coursesContainer}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  searchPlaceholder: {
    color: "#666",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  categoriesContainer: {
    marginVertical: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  selectedPill: {
    backgroundColor: "#0072e9",
  },
  pillText: {
    fontSize: 14,
    color: "#666",
  },
  selectedPillText: {
    color: "#fff",
  },
  coursesContainer: {
    padding: 20,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseImage: {
    width: "100%",
    height: 180,
  },
  courseOverlay: {
    position: "absolute",
    top: 160,
    left: 0,
    right: 0,
    padding: 20,
  },
  courseProgress: {
    height: 4,
    backgroundColor: "#e9ecef",
    borderRadius: 2,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 2,
  },
  courseContent: {
    padding: 20,
  },
  courseCategory: {
    backgroundColor: "#f1f3f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#666",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  courseInstructor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  courseStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "#666",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#666",
    marginHorizontal: 8,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 40,
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default DashboardScreen;

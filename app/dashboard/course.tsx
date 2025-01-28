import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Layout, Text, Icon } from "@ui-kitten/components";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const CourseDetailsScreen = () => {
  // Video sources
  const previewSource: VideoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const fullLectureSource: VideoSource =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  // Initialize video players
  const previewPlayer = useVideoPlayer(previewSource, (player) => {
    player.play();
  });
  const fullLecturePlayer = useVideoPlayer(fullLectureSource, (player) => {
    player.currentTime = 0;
  });

  const [currentPlayer, setCurrentPlayer] = useState(previewPlayer);

  // Switch between preview and full lecture
  const switchVideo = useCallback(async () => {
    currentPlayer.pause();
    if (currentPlayer === previewPlayer) {
      setCurrentPlayer(fullLecturePlayer);
      previewPlayer.pause();
      fullLecturePlayer.play();
    } else {
      setCurrentPlayer(previewPlayer);
      fullLecturePlayer.pause();
      previewPlayer.play();
    }
  }, [previewPlayer, fullLecturePlayer, currentPlayer]);

  const courseDetails = {
    title: "Advanced UI/UX Design Masterclass",
    instructor: "Khalil Benkhelil",
    rating: 4.8,
    students: 2345,
    price: 89.99,
    description:
      "Master the art of modern UI/UX design. Learn advanced principles, tools, and workflows used by top designers worldwide.",
    features: [
      "50+ hours of video content",
      "Lifetime access",
      "Certificate of completion",
      "Project files included",
      "1-on-1 mentoring sessions",
    ],
  };

  function openPayment() {}
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {/* Video Section */}
            <View style={styles.videoContainer}>
              <VideoView
                player={currentPlayer}
                style={styles.video}
                nativeControls={false}
              />
              <TouchableOpacity style={styles.playButton} onPress={switchVideo}>
                <Text style={styles.playButtonText}>
                  {currentPlayer === previewPlayer
                    ? "Watch Full Lecture"
                    : "Back to Preview"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Course Info */}
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{courseDetails.title}</Text>

              <View style={styles.instructorRow}>
                {/*      <Image
            source={require('@/assets/images/instructor.png')}
            style={styles.instructorImage}
          /> */}
                <Text style={styles.instructorName}>
                  {courseDetails.instructor}
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>{courseDetails.rating}</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statText}>
                    {courseDetails.students} students
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>
                {courseDetails.description}
              </Text>

              <Text style={styles.sectionTitle}>What you'll get</Text>
              <View style={styles.featuresList}>
                {courseDetails.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Fixed Bottom Payment Section */}
          <View style={styles.paymentContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.price}>${courseDetails.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handlePresentModalPress();
              }}
              style={styles.buyButton}
              activeOpacity={0.8}
            >
              <Text style={styles.buyButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.container}>
                <TouchableOpacity style={[styles.card, { opacity: 0.22 }]}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require("@/assets/images/tun.png")}
                  />
                  <Text style={styles.cardText}>Local Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/dashboard/payment");
                  }}
                  style={styles.card}
                >
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require("@/assets/images/world.png")}
                  />
                  <Text style={styles.cardText}>International Payment</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
    gap: 20,
    marginVertical: 10,
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    marginBottom: 80,
  },
  videoContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#000",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#4630ec",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  contentContainer: {
    height: Dimensions.get("screen").height * 0.8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  instructorName: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  statText: {
    fontSize: 14,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginTop: 24,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  featureText: {
    fontSize: 16,
    color: "#444",
  },
  paymentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: "#666",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  buyButton: {
    backgroundColor: "#4630ec",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 16,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CourseDetailsScreen;

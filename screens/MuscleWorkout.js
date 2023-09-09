import { useEffect, useRef, useState } from "react";

import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native";
import images from "../config/theme/images";
import theme from "../config/theme/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import YoutubePlayer from "../components/common/YoutubePlayer";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "../store/app";

function MuscleWorkout({ route }) {
  const [data, setData] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const favourites = useSelector((state) => state.favourites);

  const dispatch = useDispatch();

  const handleFavourites = (favourite) => {
    let favourites_ = [...favourites];
    const f = favourites.find(
      (f) => f?.["Youtube link"] == favourite?.["Youtube link"]
    );
    if (f) {
      favourites_ = favourites_.filter(
        (f) => f?.["Youtube link"] != favourite?.["Youtube link"]
      );
    } else {
      favourites_ = [...favourites_, favourite];
    }

    dispatch(setFavourites(favourites_));
  };
  const muscle = route.params.muscle;
  const options = {
    method: "GET",
    url: "https://exerciseapi3.p.rapidapi.com/search/",
    params: { primaryMuscle: muscle.name.toLowerCase() },
    headers: {
      "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
    },
  };
  useEffect(() => {
    if (data.length < 1) {
      axios
        .request(options)
        .then(function (response) {
          setApiCalled(true);
          setData(response.data);
        })
        .catch(function (error) {
          console.error({ error: error.message });
        });
    }
  }, []);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ backgroundColor: theme.colors.darkMode, flex: 1 }}>
      <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 40 }}>
        <StatusBar
          hidden={false}
          style="auto"
          backgroundColor={"transparent"}
          barStyle="light-content"
        />
        {/* NAV BAR */}
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width,
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back"
            size={14}
            color={theme.colors.deepOrange}
            style={{
              borderColor: theme.colors.deepOrange,
              borderWidth: 1,
              borderRadius: 5,
              height: 17,
              marginTop: 5,
            }}
          />
          <Text
            style={{
              fontFamily: "mrt-bold",
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              color: theme.colors.white,
            }}
          >
            {muscle.name}
          </Text>
          <View style={{ width: 28 }} />
        </View>
        {/* WORKOUT VIDEOS */}
        <ScrollView style={{ flex: 1 }}>
          {!apiCalled && <ActivityIndicator />}

          {apiCalled ? (
            data.length > 0 ? (
              data.map((workout, i) => {
                return (
                  <View key={i} style={{ marginBottom: 20 }}>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        zIndex: 200,
                        right: 10,
                        top: 10,
                        backgroundColor: theme.colors.white,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                      }}
                    >
                      <MaterialIcons
                        name="stars"
                        size={25}
                        onPress={() => handleFavourites(workout)}
                        color={
                          favourites
                            ? favourites?.find(
                                (f) =>
                                  f?.["Youtube link"] == workout["Youtube link"]
                              )
                              ? theme.colors.deepOrange
                              : theme.colors.grey
                            : theme.colors.grey
                        }
                        style={{}}
                      />
                    </TouchableOpacity>
                    <YoutubePlayer videoUrl={workout["Youtube link"]} />
                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flex: 0.8 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginBottom: 5,
                            fontWeight: "400",
                            color: theme.colors.white,
                          }}
                        >
                          {workout?.Name} | {workout?.["Workout Type"]?.join()}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "200",
                            color: theme.colors.white,
                          }}
                        >
                          Primary muscles :{" "}
                          {workout?.["Primary Muscles"]?.join()}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "200",
                            color: theme.colors.white,
                          }}
                        >
                          Secondary muscles :{" "}
                          {workout?.["SecondaryMuscles"]?.join()}
                        </Text>
                      </View>
                      <View style={{ flex: 0.2 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginBottom: 5,
                            textAlign: "right",
                            fontWeight: "400",
                            color: theme.colors.white,
                          }}
                        >
                          Workout type
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            textAlign: "right",
                            fontWeight: "200",
                            color: theme.colors.white,
                          }}
                        >
                          {workout?.Type}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  width,
                  height: width / 4,
                  borderWidth: 1,
                  borderColor: theme.colors.grey,
                  alignItems: "center",
                  justifyContent: "center",
                  borderStyle: "dashed",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    fontWeight: "200",
                    color: theme.colors.white,
                  }}
                >
                  We are unable to get a workout for you. {"\n"}Please try again
                  or checkout other muscles
                </Text>
              </View>
            )
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
export default MuscleWorkout;

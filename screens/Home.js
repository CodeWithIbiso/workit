import { useState } from "react";
import { Image, StatusBar, Text, useWindowDimensions } from "react-native";
import { View } from "react-native";
import images from "../config/theme/images";
import theme from "../config/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import WorkoutCard from "../components/common/WorkoutCard";
import CustomButton from "../components/common/CustomButton";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../navigation/NavigationNames";
import workoutCategories from "../utils/workoutCategories";
import { useSelector } from "react-redux";


function Home() {
  const [selected, setSelected] = useState(null);
  const data = workoutCategories;
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const midpoint = Math.floor(data.length / 2);
  const firstHalf = data.slice(0, midpoint);
  const secondHalf = data.slice(midpoint);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ backgroundColor: theme.colors.darkMode, flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: StatusBar.currentHeight || 40,
        }}
      >
        <StatusBar
          hidden={false}
          style="auto" 
          barStyle="light-content"
        />
        {/* NAV BAR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width,
            paddingHorizontal: 20,
          }}
        >
          <Ionicons
            name="menu"
            size={25}
            onPress={() => navigation.openDrawer()}
            color={theme.colors.deepOrange}
            style={{
              marginLeft: 20,
            }}
          />
          <Image
            source={images.logoImageOrange}
            style={{ width: 150, height: 50 }}
          />
          <View style={{ width: 28 }} />
        </View>
        {/* WORKOUTS */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontFamily: "mrt-bold",
              marginBottom: 40,
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
              color: theme.colors.white,
            }}
          >
            Pick a workout that suits{"\n"}your style
          </Text>
          {firstHalf.map((ex, i) => {
            return (
              <View key={i} style={{ flexDirection: "row" }}>
                <WorkoutCard
                  action={() => setSelected(i + 1)}
                  style={{
                    marginRight: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      selected == i + 1
                        ? theme.colors.deepOrange
                        : theme.colors.grey,
                  }}
                >
                  <Image
                    source={selected == i + 1 ? ex.image : ex.imageActive}
                    style={{ height: 50 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "400",
                      color:
                        selected == i + 1
                          ? theme.colors.black
                          : theme.colors.white,
                    }}
                  >
                    {ex.name}
                  </Text>
                </WorkoutCard>
                <WorkoutCard
                  action={() => setSelected(i + 4)}
                  style={{
                    marginRight: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      selected == i + 4
                        ? theme.colors.deepOrange
                        : theme.colors.grey,
                  }}
                >
                  <Image
                    source={
                      selected == i + 4
                        ? secondHalf[i].image
                        : secondHalf[i].imageActive
                    }
                    style={{ height: 50 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "400",
                      color:
                        selected == i + 4
                          ? theme.colors.black
                          : theme.colors.white,
                    }}
                  >
                    {secondHalf[i].name}
                  </Text>
                </WorkoutCard>
              </View>
            );
          })}
          {selected ? (
            <CustomButton
              action={() =>
                navigation.navigate(NavigationNames.Workout, {
                  workout: data[selected - 1],
                })
              }
              style={{ backgroundColor: theme.colors.green, marginTop: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={theme.colors.white}
                  style={{
                    borderColor: theme.colors.white,
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                />

                <Text
                  style={{
                    fontFamily: "mrt-bold",
                    marginLeft: 10,
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: theme.colors.white,
                  }}
                >
                  Continue
                </Text>
              </View>
            </CustomButton>
          ) : null}
        </View>
      </View>
    </View>
  );
}
export default Home;

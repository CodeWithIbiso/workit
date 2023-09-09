import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import BackgroundWrapper from "../components/screens/BackgroundWrapper";
import images from "../config/theme/images";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import CustomButton from "../components/common/CustomButton";
import theme from "../config/theme/theme";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../navigation/NavigationNames";
import { setIsTrial } from "../store/app";
import { useDispatch } from "react-redux";

function Intro() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  const dispatch = useDispatch();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* INTRO IMAGE AND TEXT */}
        <Image source={images.introImage} style={{ width: 250, height: 250 }} />
        <Text
          style={{
            fontFamily: "mrt-bold",
            fontSize: 22,
            marginTop: 20,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome to the {"\n"}future of fitness
        </Text>
        {/* AUTH LOGIN AND SIGN UP */}
        <View style={{ marginTop: 100 }}>
          <CustomButton
            action={() =>
              navigation.navigate(NavigationNames.Auth, { type: "signup" })
            }
            style={{ backgroundColor: theme.colors.lightOrange }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                Join us
              </Text>
            </View>
          </CustomButton>
          <Text
            style={{
              fontFamily: "mrt-mid",
              fontSize: 12,
              marginVertical: 20,
              textAlign: "center",
              fontWeight: "bold",
              color: theme.colors.white,
              opacity: 0.8,
            }}
          >
            {" "}
            --------------------- Already a member? ---------------------{" "}
          </Text>
          <CustomButton
            action={() =>
              navigation.navigate(NavigationNames.Auth, { type: "signin" })
            }
            style={{ backgroundColor: theme.colors.lightOrange }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                Continue to sign in
              </Text>
            </View>
          </CustomButton>
          {/* continue without sign in */}
          <CustomButton
            action={() => dispatch(setIsTrial(true))}
            style={{ backgroundColor: theme.colors.black, marginTop: 10 }}
          >
            {/* Admin123$$ Admin@admin.admin */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                Continue without sign in
              </Text>
            </View>
          </CustomButton>
        </View>
      </View>
    </BackgroundWrapper>
  );
}
export default Intro;

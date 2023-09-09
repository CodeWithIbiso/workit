import {
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
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
import { useSelector } from "react-redux";

function Splash() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  setTimeout(() => {
    if (Object.keys(user).length > 0) {
    //   navigation.navigate(NavigationNames.Home);
    // } else {
    //   navigation.navigate(NavigationNames.Intro);
    }
  }, 3000);

  return (
    <View
      // source={images.bgImage}
      // resizeMode="cover"
      // onLayout={onLayoutRootView}
      style={{ flex: 1,backgroundColor:theme.colors.lightOrange }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar hidden={true} />
        <Image source={images.logoImage} style={{ width: 200, height: 80 }} />
      </View>
    </View>
  );
}
export default Splash;

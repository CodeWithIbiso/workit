import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native";
import BackgroundWrapper from "../components/screens/BackgroundWrapper";
import images from "../config/theme/images";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useRef, useState } from "react";
import CustomButton from "../components/common/CustomButton";
import theme from "../config/theme/theme";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../navigation/NavigationNames";
import CustomTextInput from "../components/common/CustomTextInput";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import Constants from "expo-constants";
import { StatusBar } from "react-native";
import { useDispatch } from "react-redux";
import { setIsTrial, setUser } from "../store/app";

const statusBarHeight = StatusBar.currentHeight ?? Constants.statusBarHeight;

function Auth({ route }) {
  const [type, setType] = useState(route?.params?.type || "signin");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const dispatch = useDispatch();
  const handleAuth = () => {
    if (email != "" && password != "") {
      setLoading(true);
      // HANDLE SIGNIN
      if (type == "signin") {
        signInWithEmailAndPassword(auth, email?.toLowerCase(), password)
          ?.then((res) => {
            setEmail("");
            setPassword("");
            dispatch(setIsTrial(false));
            dispatch(setUser(res?._tokenResponse));
            setLoading(false);
          })
          ?.catch((err) => {
            const errorCode = err.code;
            switch (errorCode) {
              case "auth/user-not-found":
                // handle user not found error
                setErrorMessage(
                  "You haven't created an account with us. Please create an \naccount to continue."
                );
                break;
              case "auth/wrong-password":
                // handle wrong password error
                setErrorMessage(
                  "Your password is incorrect. Please try again."
                );
                break;
              case "auth/invalid-email":
                // handle invalid email error
                setErrorMessage("Please enter a valid email and try again.");
                break;
              default:
                setErrorMessage("");
                // handle other errors
                break;
            }
            setLoading(false);
          });
      }
      // HANDLE SIGNUP
      if (type == "signup") {
        createUserWithEmailAndPassword(auth, email?.toLowerCase(), password)
          ?.then((res) => {
            setEmail("");
            setPassword("");
            dispatch(setIsTrial(false));
            dispatch(setUser(res?._tokenResponse));
            setLoading(false);
          })
          ?.catch((err) => {
            const errorCode = err.code;
            switch (errorCode) {
              case "auth/email-already-in-use":
                // handle email already in use error
                setErrorMessage(
                  "Your email is already in use. Please sign in or sign up \nwith another email."
                );
                break;
              case "auth/invalid-email":
                // handle invalid email error
                setErrorMessage("Please enter a valid email and try again.");
                break;
              case "auth/weak-password":
                // handle weak password error
                setErrorMessage(
                  "Your password is weak. Please select a strong password \nand try again."
                );
                break;
              default:
                // handle other errors
                break;
            }
            setLoading(false);
          });
      }
    }
  };
  const handleSetType = (type) => {
    setEmail("");
    setPassword("");
    setType(type);
  };
  if (!fontsLoaded) {
    return null;
  }

  return (
    <BackgroundWrapper>
      <View style={{ marginTop: statusBarHeight || 40 }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: 400,
          minHeight: height * 1.15,
        }}
      >
        {/* INTRO IMAGE AND TEXT */}
        <Image
          source={type == "signin" ? images.signin : images.signup}
          resizeMode="contain"
          style={{ height: width }}
        />
        {/* AUTH LOGIN AND SIGN UP */}
        <View style={{ width: width - 50 }}>
          {type == "signin" ? (
            <Text
              style={{
                fontFamily: "mrt-bold",
                fontSize: 22,
                marginTop: 40,
                fontWeight: "bold",
              }}
            >
              Welcome back!
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "mrt-bold",
                fontSize: 22,
                marginTop: 40,
                fontWeight: "bold",
              }}
            >
              We're glad to have you.{" "}
            </Text>
          )}
          <Text
            style={{
              fontFamily: "mrt-mid",
              fontSize: 10,
              marginVertical: 10,
              fontWeight: "bold",
              color: theme.colors.lightOrange,
            }}
          >
            {errorMessage}{" "}
          </Text>
          <CustomTextInput
            value={email}
            placeholder={"Email"}
            onChange={setEmail}
            secureTextEntry={false}
            autoCapitalize={"sentences"}
          />
          <CustomTextInput
            secureTextEntry={true}
            value={password}
            placeholder={"Password"}
            onChange={setPassword}
            autoCapitalize={"none"}
          />
          {type == "signin" ? (
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
              Dont have an account?{" "}
              <Text
                onPress={() => handleSetType("signup")}
                style={{ color: theme.colors.black }}
              >
                Sign up
              </Text>
            </Text>
          ) : (
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
              Already have an account?{" "}
              <Text
                onPress={() => handleSetType("signin")}
                style={{ color: theme.colors.black }}
              >
                Sign in
              </Text>
            </Text>
          )}
        </View>
        <CustomButton
          action={() => handleAuth()}
          style={{ backgroundColor: theme.colors.lightOrange }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!loading ? (
              type == "signin" ? (
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
                  Sign In
                </Text>
              ) : (
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
                  Sign up
                </Text>
              )
            ) : (
              <ActivityIndicator />
            )}
          </View>
        </CustomButton>
      </ScrollView>
    </BackgroundWrapper>
  );
}
export default Auth;

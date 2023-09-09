import {
  AntDesign,
  Entypo,
  EvilIcons,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../config/theme/images";
import theme from "../../config/theme/theme";
import NavigationNames from "../../navigation/NavigationNames";
import { logout, setIsTrial } from "../../store/app";
import Constants from "expo-constants";
import { auth } from "../../services/firebaseConfig";
import { getAuth, deleteUser } from "firebase/auth";

export default function CustomSidebarMenu({ navigation }) {
  const user = useSelector((state) => state.user);
  const favourites = useSelector((state) => state.favourites);
  const statusBarHeight = StatusBar.currentHeight ?? Constants.statusBarHeight;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.closeDrawer();
  };
  const isTrial = useSelector((state) => state.isTrial);
  const handleDelete = () => {
    try {
      const user = auth.currentUser;
      deleteUser(user)
        .then((res) => {
          Alert.alert("Your account has been deleted successfully.");
          handleLogout();
          // User deleted.
        })
        .catch((error) => {
          Alert.alert(
            "An error occured while trying to delete your account. \n Please sign in and try again"
          );
          handleLogout();
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteAlert = () => {
    Alert.alert(
      "Your account will be permanently deleted",
      "We are sorry to let you go",
      [
        {
          text: "Cancel",
        },
        {
          onPress: () => handleDelete(),
          text: "Ok",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.grey }}>
      <StatusBar
        backgroundColor="transparent"
        hidden={true}
        translucent
        barStyle="light-content"
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS === "android" ? statusBarHeight : 0,
        }}
      >
        <View>
          <Image
            source={images.logoImageOrange}
            style={{ width: 150, height: 50 }}
          />
          <Text
            style={{
              fontSize: 12,
              marginLeft: 15,
              fontWeight: "400",
              color: theme.colors.white,
            }}
          >
            {/* {user?.email} */}
          </Text>
        </View>
        <Ionicons
          name="close"
          size={25}
          onPress={() => navigation.closeDrawer()}
          color={theme.colors.deepOrange}
          style={{
            alignSelf: "flex-end",
            right: 10,
            top: 10,
            position: "absolute",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: theme.colors.deepOrange,
          marginVertical: 30,
        }}
      />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationNames.Favourites)}
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <Ionicons
            name="heart"
            size={22}
            color={theme.colors.deepOrange}
            style={{
              marginRight: 20,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: theme.colors.white,
            }}
          >
            {" "}
            Favourites{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigationNames.Stopwatch)}
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <Entypo
            name="stopwatch"
            size={20}
            color={theme.colors.deepOrange}
            style={{
              marginRight: 20,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: theme.colors.white,
            }}
          >
            {" "}
            Stopwatch{" "}
          </Text>
        </TouchableOpacity>
        {!isTrial ? (
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: "row",
              marginBottom: 180,
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <AntDesign
              name="logout"
              size={20}
              onPress={() => navigation.closeDrawer()}
              color={theme.colors.deepOrange}
              style={{
                marginRight: 20,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: theme.colors.white,
              }}
            >
              {" "}
              Logout{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              dispatch(setIsTrial(false));
            }}
            style={{
              flexDirection: "row",
              marginBottom: 180,
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <MaterialCommunityIcons
              name="account-plus"
              size={20}
              color={theme.colors.deepOrange}
              style={{
                marginRight: 20,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: theme.colors.white,
              }}
            >
              {" "}
              Signin{" "}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!isTrial ? (
        <TouchableOpacity
          onPress={handleDeleteAlert}
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}
        >
          <FontAwesome
            name="trash"
            size={20}
            onPress={() => navigation.closeDrawer()}
            color={theme.colors.lightOrange}
            style={{
              marginRight: 20,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: theme.colors.white,
            }}
          >
            {" "}
            Delete Account
          </Text>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: theme.colors.deepOrange,
          marginVertical: 30,
        }}
      />
      <View style={{ flex: 0.2 }}>
        <Text
          style={{
            fontSize: 12,
            marginLeft: 15,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 20,
            color: theme.colors.white,
          }}
        >
          {" "}
          WorkIt v1.0.0{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
}

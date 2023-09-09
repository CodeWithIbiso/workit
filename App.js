import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Intro from "./screens/Intro";
import NavigationNames from "./navigation/NavigationNames";
import Splash from "./screens/Splash";
import Workout from "./screens/Workout";
import MuscleWorkout from "./screens/MuscleWorkout";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomSidebarMenu from "./components/screens/CustomSidebarMenu";
import Auth from "./screens/Auth";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import Favourites from "./screens/Favourites";
import Stopwatch from "./screens/Stopwatch";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const { width } = useWindowDimensions();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerType: "front",
              drawerStyle: {
                width: width - 50,
              },
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}
          >
            <Drawer.Screen name="App" component={App} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const user = useSelector((state) => state.user);
  const isTrial = useSelector((state) => state.isTrial);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.keys(user).length < 1 && !isTrial ? (
        <>
          <Stack.Screen name={NavigationNames.Intro} component={Intro} />
          <Stack.Screen name={NavigationNames.Auth} component={Auth} />
        </>
      ) : (
        <>
          <Stack.Screen name={NavigationNames.Home} component={Home} />
          <Stack.Screen name={NavigationNames.Workout} component={Workout} />
          <Stack.Screen
            name={NavigationNames.Favourites}
            component={Favourites}
          />
          <Stack.Screen
            name={NavigationNames.Stopwatch}
            component={Stopwatch}
          />
          <Stack.Screen
            name={NavigationNames.MuscleWorkout}
            component={MuscleWorkout}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MyDrawer;

import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { View } from "react-native";
import theme from "../config/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";


function Stopwatch({ }) {
  const [timer, setTimer] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isRunning) {
      // Start blinking animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
        
      ).start();
    } else {
      // Stop blinking animation
      blinkAnim.stopAnimation();
      blinkAnim.setValue(1);
    }
  }, [isRunning]);
  const startTimer = () => {
    setIsRunning(true);
    const startTime = Date.now() - elapsedTime;
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setElapsedTime(0);
  };


  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
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
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        {/* NAV BAR */}
        <View
          style={{
            marginBottom:20,
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
          <Text style={{ fontFamily: 'mrt-bold', fontSize: 24 ,textAlign:'center', fontWeight:'bold', color : theme.colors.white }}>Stopwatch</Text>
          <View style={{ width: 28 }} />
        </View>
        <ScrollView contentContainerStyle={{flex:1}}>
              {/* STOPWATCH */}
              <View style={{justifyContent:'center',alignItems:'center',marginTop:100,width:200,height:200,alignSelf:'center',borderWidth:5,borderColor:theme.colors.grey,borderRadius:100}}>
                 <Animated.Text useNativeDriver={false} style={[{   fontSize: 32 ,textAlign:'center', fontWeight:'200', color : theme.colors.white }, !isRunning && { opacity: blinkAnim }]}>{ formatTime(elapsedTime)}</Animated.Text>
              </View>
              {/* CONTROLS */}
              <View style={{ alignSelf:'center',marginTop:200}}>
                {/* {
                  isRunning? */}
                  <View style={{width,alignSelf:'center',flexDirection:'row',justifyContent:'space-evenly'}}>
                  <TouchableOpacity
                  onPress={resetTimer}
                style={{backgroundColor:theme.colors.grey,padding:15,borderRadius:100}}
                >
                  <Ionicons
                    name="ios-refresh"
                    size={15}
                    color={theme.colors.white}
                    style={{ 
                    }}
                  />
                </TouchableOpacity>
                  <TouchableOpacity
                onPress={startTimer}
                style={{backgroundColor:theme.colors.deepOrange,padding:15,borderRadius:100}}
                >
                  <Ionicons
                    name="play-sharp"
                    size={15}
                    color={theme.colors.white}
                    style={{ 
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={pauseTimer}
                style={{backgroundColor:theme.colors.deepOrange,padding:15,borderRadius:100}}
                >
                  <Ionicons
                    name="md-pause-outline"
                    size={15}
                    color={theme.colors.white}
                    style={{ 
                    }}
                  />
                </TouchableOpacity>
                 </View>
              {/* : */}
              {/* } */}
              </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default Stopwatch;

import { useState } from "react";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { View } from "react-native";
import images from "../config/theme/images";
import theme from "../config/theme/theme";
import {Ionicons} from '@expo/vector-icons';
import { useFonts } from "expo-font";
import WorkoutCard from "../components/common/WorkoutCard";
import CustomButton from "../components/common/CustomButton";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../navigation/NavigationNames";

 


function Workout({ route }) {
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const [fontsLoaded] = useFonts({
    "mrt-mid": require("../assets/fonts/Montserrat-Medium.ttf"),
    "mrt-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mrt-xbold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  const workout =  route.params.workout
  const handleSelectedWorkout =(muscle)=>{
    navigation.navigate(NavigationNames.MuscleWorkout,{ muscle : muscle})
  }
  if (!fontsLoaded) {
    return null;
  } 
  return (
    <ScrollView style={{backgroundColor:theme.colors.darkMode,flex:1}}>
        <View style={{ flex: 1,  marginTop:StatusBar.currentHeight || 40 }}>
        <StatusBar hidden={false} style='auto' backgroundColor={'transparent'} barStyle="light-content" />
          {/* NAV BAR */}
          <View style={{flexDirection:'row',justifyContent:'space-between',width,paddingHorizontal:20,marginTop:10}}>
            <Ionicons onPress={()=>navigation.goBack()} name="chevron-back" size={14} color={theme.colors.deepOrange} style={{borderColor:theme.colors.deepOrange,borderWidth:1,borderRadius:5,height:17,marginTop:5}}/>
            <Text style={{ fontFamily: 'mrt-bold', fontSize: 24 ,textAlign:'center', fontWeight:'bold', color : theme.colors.white }}>{workout.name}</Text>
            <View style={{width:28}}/>
          </View>
          {/* MUSCLE GROUPS */}
          <View  style={{marginTop:20,marginHorizontal:10}}>
              {
                workout.muscles.map((muscle,i)=>{
                  return(
                    <TouchableOpacity onPress={()=>handleSelectedWorkout(muscle)} key={i} style={{flex:1,marginBottom:20,flexDirection:'row',alignItems:'center'}}>
                      <View style={{flex:1}}>
                        <Text style={{ fontFamily: 'mrt-bold', fontSize: 12 ,marginBottom:5, fontWeight:'bold', color : theme.colors.white }}>{muscle.name}</Text>
                        <Text style={{ fontSize: 10, fontWeight:'400', color : theme.colors.white }}>{muscle.description}</Text>
                      </View>
                      <View style={{marginLeft:20}}>
                           <Ionicons name="chevron-forward" size={14} color={theme.colors.white} style={{}}/>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
          </View> 
        </View>
    </ScrollView>
  );
}
export default Workout;

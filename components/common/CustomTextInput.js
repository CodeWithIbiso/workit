import { useFonts } from 'expo-font';
import React from 'react'
import { TextInput } from 'react-native'
import { View } from 'react-native'
import theme from '../../config/theme/theme'

export default function CustomTextInput({placeholder,value,onChange,secureTextEntry,autoCapitalize}) {
    const [fontsLoaded] = useFonts({
        "mrt-mid": require("../../assets/fonts/Montserrat-Medium.ttf"),
        "mrt-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
        "mrt-xbold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
      });
    
     
      if (!fontsLoaded) {
        return null;
      }
  return (
    <View>
        <TextInput
        style={{
            // borderWidth: 1,
            borderRadius: 15,
            borderColor:theme.colors.grey,
            padding: 10,
            paddingHorizontal:20,
            height:50,
            backgroundColor:theme.colors.deepOrange,
            marginBottom:20,
            fontFamily: 'mrt-mid'
          }}
          secureTextEntry={secureTextEntry}
          onChangeText={text=>onChange(text)}
          value={value}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey}
        />
    </View>
  )
}

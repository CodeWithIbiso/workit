import React from 'react'
import { StatusBar } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { ImageBackground, View } from 'react-native'
import images from '../../config/theme/images';


export default function BackgroundWrapper({children,style}) {
  return (
    <ImageBackground source={images.bgImage} resizeMode="cover" style={{...styles.image,...style}}>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content"  /> 
        {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({ 
    image: {
      flex: 1
    } 
});
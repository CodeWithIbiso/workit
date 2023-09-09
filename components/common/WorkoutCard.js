import React, { Children } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import theme from '../../config/theme/theme'

export default function WorkoutCard({children,style,action}) {
  const { width } = useWindowDimensions()
  const BOX_SIZE = (width-60)/2.2
  return (
    <TouchableOpacity onPress={action} style={{height:BOX_SIZE,width:BOX_SIZE,justifyContent:'center',borderRadius:20,marginBottom:20,alignItems:'center',...style}}>
        {children}
    </TouchableOpacity>
  )
}

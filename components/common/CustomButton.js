import { TouchableOpacity, useWindowDimensions } from "react-native"
import theme from "../../config/theme/theme"



export default CustomButton =({children,style,action})=>{
    const { width } = useWindowDimensions()
    return(
      <TouchableOpacity
      onPress={action}
      style={{
          width : width -50,
          backgroundColor:theme.colors.black,
          height:60,
          borderRadius:50,
          justifyContent:'center',
          ...style,
      }}
      >
             {children}
      </TouchableOpacity>
    )
  }
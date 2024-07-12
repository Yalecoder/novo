import { View, Text } from 'react-native'
import React from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
import DefaultIcon from 'react-native-vector-icons/MaterialCommunityIcons'; 

export default function IconButtonComponent({color,iconSize, action, size, border, borderColor,svg: SvgIcon}) {
  
  return (
    <IconButton
    icon={() => (
      // <SvgIcon width={size} height={iconSize} fill={color} />


      SvgIcon
          ? <SvgIcon width={size} height={iconSize} fill={color} />
          : <DefaultIcon name="camera" size={0} color={color} />
      
    )}
    iconColor={color}
    style={{ borderColor:`${borderColor}`, borderWidth:border}}
    size={size}
    
    onPress={() => action()}
   
  />
  )
}
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Title from './Title';


export default function TextDividerComponent({text,label }) {
  return (
    <View style={styles.container}>
           <Title text={label}  className="py-2 pr-40 text-[.8rem] font-bold"/> 
           <Title text={text}  className="pr-40 text-[.8rem] font-normal"/> 
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      
      borderTopWidth:1,
      borderColor:"lightgray",
      paddingBottom:10,

    },
    camera: {
      flex: 1,
      // height:boxHeight,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  
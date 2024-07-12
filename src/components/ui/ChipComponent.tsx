import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import SelectableChips from 'react-native-chip/SelectableChips'

export default function ChipComponent({chipData,color, textColor}) {

  

  return (
    <View style={styles.container}>
        {chipData.map((chip) => (
          <Chip
            key={chip.id}
            icon={chip?.icon}
            style={styles.chip}
            onPress={() => console.log(`${chip.label} pressed`)}
            style={{backgroundColor:`${color}`,borderRadius:60 }}
            textStyle={{color:`${textColor}`, fontSize:10, }}
          >
            {chip.label}
            
          </Chip>
        ))}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:4,
    
alignSelf:'flex-end'
  },
  chip: {
    margin: 4,
  },
});
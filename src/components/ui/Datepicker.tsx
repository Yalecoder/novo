import { placeholder } from "drizzle-orm";
import React, { useState } from "react";
import {
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useForm, Controller } from 'react-hook-form';

const Datepicker = ({ name, label, placeholder,errorMessage, control}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  function formatDate(dateString) {
    
const date = new Date(dateString);          

const dateFormatted = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}).format(date);

console.log(dateFormatted);
return dateFormatted;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", formatDate(date));
    hideDatePicker();
  };

  return (
    <View className="w-full">
         {/* <TouchableOpacity
          onPress={() => showDatePicker()}
          style={{}}
        >
      <TextInput
        style={styles.InputFieldComponent}
        className="w-full"
        
        onChangeText={(birthDate) => {
          console.log("datepicker", birthDate);
         
        }}
        placeholder={placeholder}
        editable={false}
      />


 <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

</TouchableOpacity> */}

<Text style={styles.label}>{label}</Text> 
<Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
              style={styles.InputFieldComponent}
              className="w-full"
                placeholder={placeholder}
                value={value ? formatDate(value) : ''}
                
                editable={false}
              />
              
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              maximumDate={new Date(2006, 0, 1)}
              onConfirm={(date)=>{
                console.log("data selected", formatDate(date))
                // handleConfirm()\
            
                onChange(new Date(String(date)))
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
          </>
        )}
      />
         <Text style={{color: 'red', marginBottom:10}}>{errorMessage}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  InputFieldComponent: {
    borderColor: "black",
    borderWidth: 1,
    color:"black",
    // marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    paddingBottom: 10,
    // paddingTop: 10,
  },
});
export default Datepicker;


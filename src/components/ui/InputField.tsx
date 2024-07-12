import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const InputField = ({
  label,
  placeholder,
  name,
  type,
  secureTextEntry,
  errorField,
  errorMessage,
  control,
  value,
}) => {
  return (
    <View className="w-full">
      <Text style={styles.label}>{label}</Text>

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.InputFieldComponent}
            className="w-full h-14"
            onChangeText={(text) => {
              console.log("aaaaa", text);

              onChange(text);
            }}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={type}
            defaultValue={value}
          />
        )}
      />
      <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  InputFieldComponent: {
    borderColor: "black",
    borderWidth: 1,
    // marginBottom: 10,
    padding: 14,
    borderRadius: 5,
  },
  label: {
    paddingBottom: 10,
    // paddingTop:10,
  },
});
export default InputField;

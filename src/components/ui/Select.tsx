import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

export default function Select({
  control,
  label,
  name,
  errorMessage,
  items,
  setItems,
  ElevationSize,
  enabled
}) {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState(null);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>
        {label} {ElevationSize}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            {/* <DropDownPicker
           
                style={{
                    backgroundColor: "transparent",
                }}
           
            open={open}
            value={value || null} // Ensure value is not undefined
            items={items}
            setOpen={setOpen}
            setValue={onChange}
            // setItems={setItems}
            onChangeValue={(val) => {
              onChange(val);
            }}
              placeholder="Selecione"
              containerStyle={{ height: 40, marginBottom: 20 }}            
                /> */}

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  setItems(itemValue);
                  onChange(itemValue);
                }}
                style={styles.picker}
                enabled={enabled === undefined ? true : enabled}
              >
                <Picker.Item label="Selecione" value=""/>
                {items.map((item) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </Picker>
            </View>
            {errorMessage && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errorMessage}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    // paddingTop:10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
  },
});

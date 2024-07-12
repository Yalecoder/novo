import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

const AutoCompleteField = ({ options, onOptionSelected }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const filterOptions = (text) => {
    setSearchText(text);
    setFilteredOptions(options.filter((option) => option.includes(text)));
  };

  const onOptionPress = (option) => {
    setSearchText(option);
    setFilteredOptions(options);
    onOptionSelected(option);
  };

  return (
    <View style={{ padding: 20, position: "relative", backgroundColor: "red", zIndex: 30 }}>
      <TextInput
        value={searchText}
        onChangeText={filterOptions}
        placeholder="Search..."
        className="w-full border"
        style={{
          height: 40,
          borderColor: "black",
          borderWidth: 1,
        }}
      />
      <View style={{ position: "absolute", marginLeft: 20, top: "150%"}} className="w-full">
        <ScrollView contentContainerStyle={{ backgroundColor: "gray" }}>
          {filteredOptions.map((item) => (
            <TouchableOpacity key={item} onPress={() => onOptionPress(item)} >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AutoCompleteField;

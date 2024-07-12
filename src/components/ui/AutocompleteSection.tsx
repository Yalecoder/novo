import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import NoResultsComponent from "./NoResultsComponent";
import { useForm, Controller } from "react-hook-form";
import NoItemsComponent from "./NoItemsComponent";

const customStyles = {
  container: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  selectToggle: {
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
  },
  selectToggleText: {
    color: "black",
    fontSize: 14,
  },
  itemText: {
    color: "black",
    fontSize: 14,
  },
  subItemText: {
    color: "green",
    fontSize: 12,
  },
  chipContainer: {
    backgroundColor: "lightgray",
  },
  chipText: {
    color: "black",
  },
  selectedItem: {
    backgroundColor: "#5CA439",
    color: "red",
  },
  selectedSubItem: {
    backgroundColor: "lightgreen",
  },
};

export default class AutocompleteSection extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
    };
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    const { label } = this.props;
    const { name } = this.props;
    const { control } = this.props;
    const { items } = this.props;
    const { errorMessage } = this.props;

    return (
      <View className="w-full">
        {label && <Text style={styles.label}>{label}</Text>}

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <SectionedMultiSelect
              items={items}
              IconRenderer={Icon}
              single={true}
              uniqueKey="id"
              // subKsey="children"
              selectText="Seleccionar Utilizador"
              searchPlaceholderText="Pesquisar utilizador"
              confirmText="Confirmar"
              showDropDowns={true}
              onSelectedItemsChange={(text)=>{
                console.log("eee", text)
                //  this.onSelectedItemsChange(text)
                onChange(text)
              }}
              selectedItems={value}
              styles={customStyles}
              noItemsComponent={<NoItemsComponent/>}
              noResultsComponent={<NoResultsComponent />}
              colors={{
                primary: "#5CA439",
                success: "white",
              }}
            />
          )}
        />
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});

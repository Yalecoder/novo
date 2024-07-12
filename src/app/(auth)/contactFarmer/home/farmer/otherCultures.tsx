import InformationDialog from "@/components/modal/InformationDialog";
import ButtonComponent from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import { setFamerId } from "@/context/zustand";
import { getAuxiliarTable } from "@/database/actions/auxliaryTable";
import {
  createOrUpdateFarmerOtherCultures,
  getOneFarmerOtherCultures,
} from "@/database/actions/getFarmer";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function OtherCultures() {
  const navigation = useNavigation();

  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [otherCultures, setOtherCultures] = useState([]);
  const [defaultValues, setDefaultValues] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const isFocused = useIsFocused();

  async function fetchOtherCulturesDataSave() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const response = await getOneFarmerOtherCultures(farmer?.farmerId);
      if (response && response.otherCultures) {
        const cultures = deserializeArray(response.otherCultures);
        const formattedCultures = cultures.map((culture) => ({
          id: culture?.id,
          name: culture?.name,
          value: culture?.value || "",
        }));

        setOtherCultures(formattedCultures);

        const initialValues = formattedCultures.reduce((acc, culture) => {
          acc[culture.name] = culture.value;
          return acc;
        }, {});
        setDefaultValues(initialValues);
        reset(initialValues);
      }

      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOtherCultures() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const data = await getAuxiliarTable();

      const cultures = deserializeArray(data?.otherCultures);

      const formattedCultures = cultures.map((culture) => ({
        id: culture?.id,
        name: culture?.name,
        value: "",
      }));

      setOtherCultures(formattedCultures);
    } catch (error) {
      console.log(error);
    }
  }

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    fetchOtherCultures();
    fetchOtherCulturesDataSave();
  }, []);

  async function onSubmit(data) {
    try {
      const result = otherCultures.map((culture) => ({
        id: culture.id,
        name: culture.name,
        value: data[culture.name],
      }));

      const response = await createOrUpdateFarmerOtherCultures(
        farmer?.farmerId,
        result
      );

      showModal("Dados da campanha editados com sucesso!", isSuccess);

      console.log({ response });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="h-full p-5">
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {otherCultures.map((culture) => (
          <View key={culture.id} style={styles.inputContainer}>
            <Text style={{ paddingBottom: 10 }}>{culture.name}</Text>
            <Controller
              control={control}
              name={culture.name}
              defaultValue={culture.value}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors[culture.name] && { borderColor: "red" },
                  ]}
                  value={value}
                  onChangeText={onChange}
                  className="w-full h-14"
                />
              )}
            />
            {errors[culture.name] && (
              <Text style={styles.errorText}>
                {errors[culture.name]?.message}
              </Text>
            )}
          </View>
        ))}

        <View className="w-full justify-center items-center">
          <ButtonComponent
            className="bg-[#5CA439]"
            title="Gravar"
            action={handleSubmit(onSubmit)}
            loading={false}
          />

          <LinkButton
            text="Cancelar"
            className="text-[1rem] text-[#5CA439]"
            action={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

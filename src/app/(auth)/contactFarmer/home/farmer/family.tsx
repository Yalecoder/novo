import InformationDialog from "@/components/modal/InformationDialog";
import ButtonComponent from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import LinkButton from "@/components/ui/LinkButton";
import Select from "@/components/ui/Select";
import { setFamerId } from "@/context/zustand";
import {
  createOrUpdateFarmerFamily,
  getOneFarmerFamily,
} from "@/database/actions/getFarmer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";

const Schema = z.object({
  improvedHouse: z.boolean({ required_error: "Este campo é obrigatório." }),
  knowRead: z.boolean({ required_error: "Este campo é obrigatório." }),
  hasRadio: z.boolean({ required_error: "Este campo é obrigatório." }),
  hasBicycle: z.boolean({ required_error: "Este campo é obrigatório." }),
  hasMotorcycle: z.boolean({ required_error: "Este campo é obrigatório." }),
  houseHold: z.string({ required_error: "Este campo é obrigatório." }),
  gender: z.string({ required_error: "Este campo é obrigatório." }),
  maritalStatus: z.string({ required_error: "Este campo é obrigatório." }),
  religion: z.string({ required_error: "Este campo é obrigatório." }),
  ethnicity: z.string({ required_error: "Este campo é obrigatório." }),
});

export default function FamilyScreean() {
  const [defaultValues, setDefaultValues] = useState(null);
  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const { navigate } = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    fetch();
  }, []);

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  async function fetch() {
    try {
      const data = await getOneFarmerFamily(farmer?.farmerId);

      const response = data?.length > 0 ? data[0] : {};

      console.log({ response });

      // setValues(data?.length > 0 ? data[0] : {});

      setDefaultValues({
        ...response,
      });
      // Atualizar os valores padrão do formulário
      reset({
        ...response,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      gender: defaultValues?.gender,
    },
  });

  console.log("asdasdasd", defaultValues?.gender);

  async function onSubmit(data) {
    data.farmerId = farmer?.farmerId;

    try {
      const save = await createOrUpdateFarmerFamily(data);

      showModal("Família editada com sucesso!", true);

      console.log({ save });

      return save;
    } catch (error) {
      console.log(error);
    }
  }

  console.log();

  return (
    <View className=" h-full">
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />

      <View className="bg-[#5CA439] w-full p-5">
        <Text className="text-[1.3rem] text-white">Nome do Produtor</Text>
        <Text className="text-white opacity-90">{farmer?.farmerName}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="p-5">
        <Select
          label="Tem casa melhorada?"
          name="improvedHouse"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors?.improvedHouse?.message}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />

        <Select
          label="Sabe ler"
          name="knowRead"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.knowRead?.message}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />

        <Select
          label="Tem Rádio"
          name="hasRadio"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.hasRadio?.message}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />
        <Select
          label="Tem Bicicleta"
          name="hasBicycle"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.hasBicycle?.message}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />
        <Select
          label="Tem Motociclo"
          name="hasMotorcycle"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.hasMotorcycle?.message}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />
        <InputField
          label="Agregado Familiar"
          placeholder=""
          name="houseHold"
          control={control}
          errorMessage={errors.houseHold?.message}
        />
        <Select
          label="Gênero"
          name="gender"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.gender?.message}
          items={[
            { label: "Masculino", value: "male" },
            { label: "Femenino", value: "female" },
          ]}
        />

        <Select
          label="Estado Civil"
          name="maritalStatus"
          setItems={(e) => console.log(e)}
          control={control}
          errorMessage={errors.maritalStatus?.message}
          items={[
            { label: "Solteiro/a", value: "single" },
            { label: "Casado/a", value: "married" },
            { label: "Viuvo/a", value: "widower" },
            { label: "Divorciado/a", value: "divorced" },
          ]}
        />

        <InputField
          label="Religião"
          placeholder=""
          name="religion"
          control={control}
          errorMessage={errors.religion?.message}
        />

        <InputField
          label="Etnia"
          placeholder=""
          name="ethnicity"
          control={control}
          errorMessage={errors.ethnicity?.message}
        />

        <View className="w-full justify-center items-center mb-16">
          <ButtonComponent
            className="bg-[#5CA439]"
            title="Gravar"
            action={handleSubmit(onSubmit)}
            loading={false}
          />

          <LinkButton
            text="Cancelar"
            className="text-[1rem] text-[#5CA439]"
            action={() => console.log("linkkkk")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

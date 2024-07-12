import InformationDialog from "@/components/modal/InformationDialog";
import ButtonComponent from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import LinkButton from "@/components/ui/LinkButton";
import { setFamerId } from "@/context/zustand";
import {
  createOrUpdateFarmerCotton,
  getOneFarmerCotton,
} from "@/database/actions/getFarmer";
import { zodResolver } from "@hookform/resolvers/zod";
import { min } from "drizzle-orm";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { z } from "zod";

const stepOneSchema = z.object({
  estimateHa: z
    .string({ required_error: "Este campo é obrigatório." })
    .min(1, "Este campo é obrigatório."),
  numberOfPermanentMen: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "Este campo é obrigatório."),
  numberOfSeasonalMen: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "Este campo é obrigatório."),
  numberOfPermanentWomen: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "Este campo é obrigatório."),
  numberOfSeasonalWomen: z
    .string({
      required_error: "Este campo é obrigatório.",
    })
    .min(1, "Este campo é obrigatório."),
  numberOfMinors: z
    .string({ required_error: "Este campo é obrigatório." })
    .min(1, "Este campo é obrigatório."),
});

export default function Cotton() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
  });

  const navigation = useNavigation();

  const [farmer] = setFamerId((state) => [state.farmerId]);
  const [defaultValues, setDefaultValues] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

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
    fetch();
  }, []);

  async function fetch() {
    try {
      const data = await getOneFarmerCotton(farmer?.farmerId);

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

  async function onSubmit(data) {
    data.farmerId = farmer?.farmerId;

    try {
      const save = await createOrUpdateFarmerCotton(data);

      showModal("Dados da campanha editados com sucesso!", true);

      console.log({ save });

      return save;
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
        <InputField
          label="Estimativa (ha)"
          placeholder=""
          name="estimateHa"
          control={control}
          errorMessage={errors.estimateHa?.message}
        />

        <InputField
          label="Nº de Homens Permanentes"
          placeholder=""
          name="numberOfPermanentMen"
          control={control}
          errorMessage={errors.numberOfPermanentMen?.message}
        />
        <InputField
          label="Nº de Homens Sazonais"
          placeholder=""
          name="numberOfSeasonalMen"
          control={control}
          errorMessage={errors.numberOfSeasonalMen?.message}
        />
        <InputField
          label="Nº de Mulheres Permanentes"
          placeholder=""
          name="numberOfPermanentWomen"
          control={control}
          errorMessage={errors.numberOfPermanentWomen?.message}
        />
        <InputField
          label="Nº de mulheres sazonais"
          placeholder=""
          name="numberOfSeasonalWomen"
          control={control}
          errorMessage={errors.numberOfSeasonalWomen?.message}
        />
        <InputField
          label="Nº de menores"
          placeholder=""
          name="numberOfMinors"
          control={control}
          errorMessage={errors.numberOfMinors?.message}
        />

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

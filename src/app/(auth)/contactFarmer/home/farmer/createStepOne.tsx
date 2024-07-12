import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StepOne from "@/components/form/StepOne";
import StepTwo from "@/components/form/StepTwo";
import InputField from "@/components/ui/InputField";
import Datepicker from "@/components/ui/Datepicker";
import Select from "@/components/ui/Select";
import ButtonComponent from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import ModalComponent from "@/components/ui/ModalComponent";
import { getAuxiliarTable } from "@/database/actions/auxliaryTable";

const stepOneSchema = z.object({
  name: z.string().nonempty("Este campo é obrigatório."),
  reference: z.string().nonempty("Este campo é obrigatório."),
  birthDate: z.date(),
  cellphone: z
    .string()
    .regex(/^\d{9}$/, "Mínimo de 9 caracteres e máximo de 9 caracteres."),
  project: z.string().nonempty("Este campo é obrigatório."),
  high_risk_farmer: z.string().nonempty("Este campo é obrigatório."),
});

const Create = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepOneSchema),
  });

  const [projects, setProjects] = useState([]);

  const [farmerRegisterData, setFarmerRegisterData] = useState({
    name: "",
    reference: "",
    birthDate: "",
    cellphone: "",
    project: "",
    high_risk_farmer: "",
    photo: "",
  });

  async function fetchProject() {
    const deserializeArray = (jsonString) => JSON.parse(jsonString);

    try {
      const data = await getAuxiliarTable();

      setProjects(deserializeArray(data?.projects));
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ projects });

  useEffect(() => {
    fetchProject();
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { push } = useRouter();
  const navigation = useNavigation();

  const onSubmit = (data) => {
    const updatedFarmerRegisterData = { ...farmerRegisterData, ...data };
    setFarmerRegisterData(updatedFarmerRegisterData);

    navigation.navigate("home/farmer/createStepTwo", {
      data: JSON.stringify(updatedFarmerRegisterData),
    });
  };

  return (
    <View className="h-full">
      <ScrollView>
        <View className="p-5 mb-3">
          {/* <ModalComponent/> */}
          <InputField
            label="Nome"
            placeholder="Ex: Antonio Manuel"
            name="name"
            control={control}
            errorMessage={errors.name?.message}
          />
          <InputField
            label="Referência"
            placeholder="Ex: Pr2892792"
            name="reference"
            control={control}
            errorMessage={errors.reference?.message}
          />
          <Datepicker
            label="Data de Nascimento"
            placeholder="Selecione data de nascimento"
            name="birthDate"
            control={control}
            errorMessage={errors.birthDate?.message}
          />
          <InputField
            label="Telemóvel"
            placeholder="Ex: 85000000"
            name="cellphone"
            type="number-pad"
            control={control}
            errorMessage={errors.cellphone?.message}
          />
          <Select
            label="Projecto"
            name="project"
            control={control}
            setItems={(e) => {}}
            errorMessage={errors.project?.message}
            items={projects.map((project) => {
              return { label: project?.name, value: project?.id };
            })}
          />
          <Select
            label="Produtor de Alto Risco"
            name="high_risk_farmer"
            setItems={(e) => {}}
            control={control}
            errorMessage={errors.high_risk_farmer?.message}
            items={[
              { label: "Sim", value: "yes" },
              { label: "Não", value: "no" },
            ]}
          />
          <ButtonComponent
            className="bg-[#5CA439]"
            title="Avançar"
            action={handleSubmit(onSubmit)}
          />
          <LinkButton
            text="Cancelar"
            className="text-[1rem] text-[#000000] self-center"
            action={() => {
              navigation.navigate("/home/farmer/createStepTwo");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Create;

import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputField from '@/components/ui/InputField';
import ButtonComponent from '@/components/ui/Button';
import Datepicker from '@/components/ui/Datepicker';
import Select from '@/components/ui/Select';
import LinkButton from '../ui/LinkButton';

const stepOneSchema = z.object({
  name: z.string().nonempty("Este campo é obrigatório."),
  reference: z.string().nonempty("Este campo é obrigatório."),
  birthDate: z.date(),
  cellphone: z.string().regex(/^\d{9}$/, "Mínimo de 9 caracteres e máximo de 9 caracteres."),
  pgr: z.string().nonempty("Este campo é obrigatório."),
  high_risk_farmer: z.string().nonempty("Este campo é obrigatório."),
});

const StepOne = ({ onNext }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(stepOneSchema),
  });



  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <View className="p-5">
      <Text>{JSON.stringify(errors)}</Text>
     
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
        label="PGR"
        name="pgr"
        control={control}
        errorMessage={errors.pgr?.message}
        items={[
          { label: "Sim", value: "yes" },
          { label: "Não", value: "no" },
        ]}
      />
      <Select
        label="Produtor de Alto Risco"
        name="high_risk_farmer"
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
      <LinkButton text="Cancelar" className="text-[1rem] text-[#000000] self-center" action={() => {push('pages/')}} />
    </View>
  );
};

export default StepOne;

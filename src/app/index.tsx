import AutoCompleteField from "@/components/ui/AutoCompleteField";
import InputField from "@/components/ui/InputField";
import AutocompleteSection from "@/components/ui/AutocompleteSection";
import { MultiSelectExample } from "@/components/ui/MultiSelectExample";
import { addFarmers } from "@/database/actions/famer/addFarmer";
import { getData, getOneFarmer } from "@/database/actions/getFarmer";
import { useRouter, useNavigation, router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text, TouchableOpacity, View } from "react-native";
import ButtonComponent from "@/components/ui/Button";
import CardComponent from "@/components/ui/Card";
import LinkButton from "@/components/ui/LinkButton";
import Title from "@/components/ui/Title";
import CustomImage from "@/components/ui/CustomImage";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "@/components/ui/Select";
import Datepicker from "@/components/ui/Datepicker";
import { useDefaultStore } from "@/context/zustand";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { getOneUser, listUsers } from "@/database/actions/users";
import { useIsFocused } from "@react-navigation/native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../database/drizzle/migrations";
import { compareSync } from "bcryptjs";

const expoDb = openDatabaseSync("JFSNEW.db");

const db = drizzle(expoDb);

const formSchema = z.object({
  user: z.array(z.string()).nonempty({ message: "Este campo é obrigatório." }),
  pin: z
    .string({ required_error: "Este campo é obrigatório." })
    .min(4, "Mínimo de 4 caracteres.")
    .max(4, "Excede o comprimento máximo de 4 caracteres."),
});

const items = [
  {
    name: "Apple",
    id: 10,
  },
  {
    name: "Strawberry",
    id: 17,
  },
  {
    name: "Pineapple",
    id: 13,
  },
  {
    name: "Banana",
    id: 14,
  },
  {
    name: "Watermelon",
    id: 15,
  },
  {
    name: "Kiwi fruit",
    id: 16,
  },
  {
    name: "Delcio",
    id: 100,
  },
  {
    name: "Alberto",
    id: 19,
  },
  {
    name: "Antonio",
    id: 130,
  },
  {
    name: "Fred",
    id: 102,
  },
  {
    name: "Isaias",
    id: 42,
  },
  {
    name: "Yula",
    id: 64,
  },
];

const [itemsSelect, setItemsSelect] = useState([
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]);

const { height, width } = Dimensions.get("screen");

export default function Home() {
  const [setUser] = useDefaultStore((state) => [state.setUser]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: [],
    },
  });

  const [isLoading, setLoader] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const [users, setList] = useState([]);

  const isFocused = useIsFocused();

  const { push } = useRouter();

  function handlesynchronizePage() {
    try {
      push("/synchronize");
    } catch (err) {}
  }

  async function listUser() {
    setLoader(true);
    try {
      const response = await listUsers();

      setList(response as []);
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  }

  useEffect(() => {
    listUser();
  }, [isFocused]);

  async function onSubmit(data) {
    setLoader(true);
    setValidationMessage("");

    try {
      const user = await getOneUser(data?.user[0]);

      const pass = compareSync(data?.pin, user?.password);

      if (pass) {
        setUser(user);

        push({ pathname: "market", params: { type: user?.type } });
      } else {
        setValidationMessage("Credenciais inválidas");
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      console.log("erro ao fazer login");
    }
  }

  const { success, error } = useMigrations(db, migrations);

  console.log({ validationMessage });

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ height: height - 10 }}
    >
      <View className="p-5  flex-1 justify-center items-center">
        {/* <View style={{ height: 300 }} className="w-full">
          <CardComponent className="bg-[#668856]" />
        </View> */}

        {/* <Title text="Titulos" /> */}
        <CustomImage
          // source={{ uri: 'https://example.com/image.jpg' }}

          defaultImage={require("../../assets/logo.png")}
          // style={{with:500}}
        />

        {/* <Select
          control={control}
          label="PGR"
          name="pgr"
          errorMessage={errors.pgr?.message}
          items={itemsSelect}
          setItems={setItemsSelect}
        /> */}

        <AutocompleteSection
          label="Utilizador"
          items={users}
          name="user"
          control={control}
          errorMessage={errors.user?.message}
        />

        <InputField
          label="PIN"
          placeholder="*****"
          name="pin"
          type="number-pad"
          secureTextEntry={true}
          control={control}
          errorMessage={errors.pin?.message}
        />
        <Text
          className="text-[red]"
          style={{ transform: [{ translateY: -18 }] }}
        >
          {validationMessage != "" ? validationMessage : ""}
        </Text>
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        <ButtonComponent
          className="bg-[#5CA439]"
          title="Entrar"
          action={handleSubmit(onSubmit)}
          loading={isLoading}
        />
        <LinkButton
          text="Sincronizar Dados"
          className="text-[1rem] text-[#5CA439]"
          action={() => handlesynchronizePage()}
        />

        <Text style={{ position: "absolute", bottom: "8%", left: "4%" }}>
          Versão 1.0
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

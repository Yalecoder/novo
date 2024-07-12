import { api } from "@/services";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { JSFIcons } from "../../assets/Icons/index";
import CustomImage from "@/components/ui/CustomImage";
import { createUsers, deleteAllUsers } from "@/database/actions/users";
import React from "react";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import ButtonComponent from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import {
  createAuxiliarTable,
  deleteAuxiliarTable,
} from "@/database/actions/auxliaryTable";

export interface synchronizeProps {
  id: string;
  name: string;
  password: string;
  type: string;
}

export default function synchronizePage() {
  const { push } = useRouter();

  const [isLoading, setLoader] = useState<boolean>(false);

  const [lenUsers, setLen] = useState<number>(0);

  const [doneSave, setSaveStatus] = useState(false);

  const [error, setError] = useState(false);

  async function synchronizeDevice() {
    setLoader(true);

    try {
      const response = await api.get(`/devices/token/123`);

      await deleteAllUsers();

      const listUsers = response.data.data.users as synchronizeProps[];

      setLen(listUsers.length);

      PrepareUsers(listUsers);

      setLoader(false);
    } catch (err) {
      setError(true);
      setLoader(false);
      setSaveStatus(true);
      console.log("erro oa synchronize divice", err);
    }
  }

  async function synchronizeMarketDevice() {
    setLoader(true);

    try {
      const response = await api.get(`/synchronization/device/123`);

      await deleteAuxiliarTable();

      console.log(
        "asdasd",
        response.data.projects,
        response.data.markets,
        response.data.otherCultures
      );

      const data = await createAuxiliarTable(
        response.data.projects,
        response.data.markets,
        response.data.otherCultures
      );

      console.log("save auxiliar table", { data });

      setLoader(false);
    } catch (err) {
      console.log("erro oa synchronize divice", err);
    }
  }

  async function* generateData(users: synchronizeProps[]) {
    for (let user of users) {
      yield user;
    }
  }

  async function PrepareUsers(users: synchronizeProps[]) {
    const generateuares = generateData(users);
    let stap = 0;

    for await (let user of generateuares) {
      const saveUser = await createUsers(user);

      stap = stap + 1;

      if (stap == users.length) {
        setSaveStatus(true);
      }

      console.log({ saveUser, stap, lenUsers });
    }
    setSaveStatus(true);
  }

  useEffect(() => {
    synchronizeDevice();
    synchronizeMarketDevice();
  }, []);

  return (
    <PaperProvider>
      <View style={{ flex: 1 }} className="justify-center items-center">
        <CustomImage defaultImage={require("../../assets/logo.png")} />
        <View className="flex-row justify-center items-center">
          <ActivityIndicator size={"large"} />
          <Text style={{ fontSize: 20 }} className="text-[#6D6E72]">
            A Carregar...
          </Text>
        </View>

        <Portal>
          <Modal visible={doneSave}>
            <View
              className="bg-white h-[75%] m-8 rounded-[10] justify-evenly"
              style={{ alignItems: "center" }}
            >
              {error ? (
                <AntDesign name="closecircle" size={80} color="red" />
              ) : (
                <AntDesign name="checkcircle" size={80} color="#5CA439" />
              )}

              <View>
                <Title
                  className="text-xl text-center"
                  text={
                    error
                      ? "Ocorreu um erro ao sincronizar o dispositivo"
                      : "Dados sincronizados com sucesso"
                  }
                />
              </View>
              <ButtonComponent
                className="bg-[#5CA439] w-[80%]"
                title="OK"
                action={() => push("/")}
              />
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
}

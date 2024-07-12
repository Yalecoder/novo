import PolygonExample from "@/components/offline";
import LineChart from "@/components/trackOffilne";
import CardComponent from "@/components/ui/Card";
import Title from "@/components/ui/Title";
import { cn } from "@/utils/utlis";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Network from "expo-network";

export default function MarkArea() {
  const route = useRoute();
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const { cultureType, area, points, observation, coordinates } = route.params;

  const deserializeArray = (jsonString) => JSON.parse(jsonString);

  const serial = deserializeArray(coordinates);

  const arrayFromJsonString = JSON.parse(points);

  useEffect(() => {
    checkInternetConnection();
  }, []);

  const checkInternetConnection = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
    } catch (error) {
      console.error("Erro ao verificar a conexão com a internet:", error);
      setIsConnected(false);
    }
  };

  console.log({ isConnected });

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 mb-5 mt-6 p-5">
        <View className=" h-[5.5rem] mb-5">
          <CardComponent
            className={cn(" bg-[#668856] p-5  flex flex-row justify-between ")}
          >
            <Fragment>
              <View>
                <Text className="text-[1.0rem] text-white mr-5 font-bold">
                  Tipo de Cultura
                </Text>
                <Title
                  text={cultureType}
                  className="text-white font-normal text-[1rem] opacity-75"
                />
              </View>
              <View>
                <Text className="text-[1.0rem] text-white mr-5 font-bold">
                  Área
                </Text>
                <Title
                  text={`${area} m²`}
                  className="text-white font-normal text-[1rem] opacity-75"
                />
              </View>

              <View>
                <Text className="text-[1.0rem] text-white mr-5 font-bold">
                  Nº de Pontos
                </Text>
                <Title
                  text={arrayFromJsonString?.length}
                  className="text-white font-normal text-[1rem] opacity-75"
                />
              </View>
            </Fragment>
          </CardComponent>
        </View>

        <View>
          <Title text="Observação" className="text-[1.2rem]" />
          <Text>
            {observation === "" || observation === undefined
              ? "Sem nenhuma observaçãos"
              : observation}
          </Text>
        </View>

        <View style={{ height: "70%" }}>
          <Title text="Estado" className="mt-5 mb-5 text-[1.2rem]" />

          {isConnected ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: serial ? serial[0]?.latitude : 0,
                longitude: serial ? serial[0]?.longitude : 0,
                latitudeDelta: 0.0,
                longitudeDelta: 0.0,
              }}
              onMapReady={(e) => setMapReady(true)}
            >
              <Polyline
                coordinates={serial}
                strokeColor="#FF0000"
                strokeWidth={2}
              />
              {serial && (
                <Marker
                  coordinate={{
                    latitude: serial[0]?.latitude,
                    longitude: serial[0]?.longitude,
                  }}
                  title="Sua Localização"
                  description={`Lat: ${serial[0].latitude}, Long: ${serial[0].longitude}`}
                />
              )}
            </MapView>
          ) : (
            <PolygonExample coordinates={serial} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  map: {
    height: "100%",
  },
  chipContainer: {
    alignSelf: "flex-start",
    marginVertical: 20,
  },
  chipContainerWhite: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  chipContainerCenter: {
    alignSelf: "center",
    marginVertical: 20,
  },
  chip: {
    backgroundColor: "#5CA439",
    borderRadius: 60,
  },
  chipWhite: {
    backgroundColor: "#fff",
    borderRadius: 60,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

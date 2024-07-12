import ButtonComponent from "@/components/ui/Button";
import CardComponent from "@/components/ui/Card";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Select from "@/components/ui/Select";
import { useForm } from "react-hook-form";
import { addFarmerArea } from "@/database/actions/famer/addFarmer";
import Title from "@/components/ui/Title";
import { JSFIcons } from "../../../../../../assets/Icons";
import AreaObservation from "@/components/modal/areaObservation";
import InformationDialog from "@/components/modal/InformationDialog";
import * as Network from "expo-network";
import PolygonExample from "@/components/offline";

export default function MarkArea() {
  const route = useRoute();
  const { navigate } = useRouter();

  const { farmerId } = route.params;

  const [location, setLocation] = useState(null);
  const [trackedPoints, setTrackedPoints] = useState([]);
  const [isTracking, setIsTracking] = useState();
  const mapRef = useRef(null);
  const watcherRef = useRef(null);
  const { control, handleSubmit } = useForm();
  const [selected, setSelected] = useState("");
  const [doneButton, setDoneButton] = useState(false);
  const [enableSelect, setEnabled] = useState(true);
  const [openObservation, setOpenObservation] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [observation, setObservation] = useState("");
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    checkInternetConnection();

    const setupLocationWatcher = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão para acessar a localização foi negada");
        return;
      }

      watcherRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
          mayShowUserSettingsDialog: true,
          timeInterval: 2000,
        },
        (newLocation) => {
          const { latitude, longitude, accuracy } = newLocation.coords;
          if (accuracy < 20) {
            // Filtra leituras de baixa qualidade (precisão maior que 20 metros)
            if (
              !location ||
              getDistance(location, { latitude, longitude }) < 50
            ) {
              // Ignora grandes mudanças
              setLocation({ latitude, longitude });
              if (mapRef.current) {
                mapRef.current.animateToRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 0.0,
                  longitudeDelta: 0.0,
                });
              }
              if (isTracking) {
                setTrackedPoints((prevPoints) => [
                  ...prevPoints,
                  { latitude, longitude },
                ]);
              }
            }
          }
        }
      );
    };

    setupLocationWatcher();

    return () => {
      if (watcherRef.current) {
        watcherRef.current.remove();
        watcherRef.current = null;
      }
    };
  }, [isTracking]);

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

  async function startTracking() {
    if (selected != "") {
      setEnabled(false);
      setIsTracking(true);
    } else {
      Alert.alert("Atenção", "Selecione um tipo de cultura", [
        { text: "Ok", style: "cancel" },
      ]);
    }
  }

  async function stopTracking() {
    setIsTracking(false);
    setDoneButton(true);
  }

  const clearPoints = () => {
    setIsTracking(null);
    setEnabled(true);
    setTrackedPoints([]);
    setDoneButton(false);
  };

  const getDistance = (loc1, loc2) => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em metros
  };

  async function submit(observation) {
    try {
      const sendData = await addFarmerArea(
        farmerId,
        trackedPoints,
        [],
        selected,
        observation
      );

      showModal("Marcação feita com sucesso!", true);

      return sendData;
    } catch (error) {
      console.log({ error });
    }
  }

  const showModal = (message, success) => {
    setModalMessage(message);
    setIsSuccess(success);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    navigate(`../farmer/${farmerId}`);
  };

  const hideTextAreaModal = () => {
    setOpenObservation(false);
    submit("");
    showModal("Marcação feita com sucesso!", true);
  };

  return (
    <View style={styles.container} className="bg p-5">
      <InformationDialog
        isVisible={isModalVisible}
        message={modalMessage}
        isSuccess={isSuccess}
        onClose={hideModal}
      />

      <AreaObservation
        isVisible={openObservation}
        onClose={hideTextAreaModal}
        onSubmit={(e) => {
          setObservation(e);
          submit(e);
        }}
      />
      <View>
        <Select
          label="Tipo de cultura"
          name="culture"
          control={control}
          setItems={(e) => setSelected(e)}
          items={[
            { label: "Algodao", value: "algodao" },
            { label: "Milho", value: "milho" },
            { label: "Feijao", value: "feijao" },
            { label: "MMM", value: "mmm" },
          ]}
          enabled={enableSelect}
        />
      </View>

      <Title text="Estado" className="text-[1.1rem] mb-2" />

      <View
        className=" bg-black rounded-[20] h-20"
        style={{ position: "relative", height: "65%" }}
      >
        <ImageBackground
          source={JSFIcons.ara2}
          resizeMode="contain"
          className="bg-[#668856] rounded-[60] z-10 m-4"
        >
          <View className="p-4 ml-2">
            <Title
              text="Posiciona-te num dos cantos da machamba e toca no botao Marcar"
              className="text-white w-1/2 text-[0.8rem]"
            ></Title>
          </View>
        </ImageBackground>

        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
          }}
        >
          {isConnected ? (
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: location ? location.latitude : 0,
                longitude: location ? location.longitude : 0,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
            >
              <Polyline
                coordinates={trackedPoints}
                strokeColor="#FF0000"
                strokeWidth={2}
              />
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title="Sua Localização"
                  description={`Lat: ${location.latitude}, Long: ${location.longitude}`}
                />
              )}
            </MapView>
          ) : (
            <PolygonExample coordinates={trackedPoints} location={location} />
          )}
        </View>

        <View style={{ position: "absolute", bottom: 15 }} className="w-full">
          {isTracking ? (
            <TouchableOpacity onPress={() => stopTracking()}>
              <View className="bg-[#5CA439] p-5 mr-4 ml-4 rounded-[12] h-16 items-center justify-center">
                <Text className="text-white text-[1.2rem]">Terminar</Text>
              </View>
            </TouchableOpacity>
          ) : isTracking === false ? (
            <View className="flex flex-row justify-between">
              <TouchableOpacity onPress={() => clearPoints()}>
                <View className="bg-white p-5 mr-4 ml-4 rounded-[12] h-16 items-center justify-center w-32 border-2 border-[#5CA439]">
                  <Text className="text-[#5CA439] text-[1.2rem]">Limpar</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOpenObservation(true)}>
                <View className="bg-[#5CA439] p-5 mr-4 ml-4 rounded-[12] h-16 items-center justify-center w-32">
                  <Text className="text-white text-[1.2rem]">Continuar</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => startTracking()}>
              <View className="bg-[#5CA439] p-5 mr-4 ml-4 rounded-[12] h-16 items-center justify-center">
                <Text className="text-white text-[1.2rem]">Marcar</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.trackedPointsContainer}>
        <Text style={styles.subtitle} className="text-[1.1rem]">
          Pontos Marcados
        </Text>
        {trackedPoints.length > 0 ? (
          trackedPoints.map((point, index) => (
            <Text key={index} style={styles.trackedPointText}>
              Ponto {index + 1}: Latitude: {point.latitude}, Longitude:{" "}
              {point.longitude}
            </Text>
          ))
        ) : (
          <Text style={styles.noPointsText}>Nenhum ponto marcado</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  trackedPointsContainer: {
    maxHeight: 150,
    width: "100%",
    // backgroundColor: "",
    paddingTop: 10,
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  trackedPointText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noPointsText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
  },
});

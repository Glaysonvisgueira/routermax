import React, { useState, useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "@env";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import database from "../config/firebase";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

const origin = { latitude: -5.1025988, longitude: -42.7369204 };
const destination = { latitude: -5.123543, longitude: -42.804945 };

export default function MapaRota() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  function bottomModalContent() {
    return (
      <View style={styles.containerModal}>
        <View style={styles.iconHideModal}></View>
        <View style={styles.containerDadosEntrega}>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Número do pedido:</Text>
            <Text style={styles.textoDadosDireita}>1</Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Cliente:</Text>
            <Text style={styles.textoDadosDireita}>Glayson</Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Endereço:</Text>
            <Text style={styles.textoDadosDireita}>
              Rua desembargador vidal de freitas
            </Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Complemento:</Text>
            <Text style={styles.textoDadosDireita}>Glayson</Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Bairro:</Text>
            <Text style={styles.textoDadosDireita}>Glayson</Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>Cidade:</Text>
            <Text style={styles.textoDadosDireita}>Glayson</Text>
          </View>
          <View style={styles.containerTextoDados}>
            <Text style={styles.textoDadosEsquerda}>UF:</Text>
            <Text style={styles.textoDadosDireita}>Glayson</Text>
          </View>
        </View>

        <View style={styles.containerBotoesAcoes}>
          <TouchableOpacity style={styles.botaoJustificarEntrega}>
            <Text style={styles.textoBotao}>JUSTIFICAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoConcluirEntrega}>
            <Text style={styles.textoBotao}>CONCLUIR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const sheetRef = React.useRef(null);

  function navigateBack() {
    navigation.goBack();
  }

  useEffect(() => {
    loadPedidos();
    loadInitialPosition();
  }, []);

  async function loadPedidos() {
    const dadosPedidos = await database
      .collection("pedidos")
      .onSnapshot((query) => {
        const list = [];
        query.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setPedidos(list);
      });
  }

  async function loadInitialPosition() {
    const { granted } = await requestForegroundPermissionsAsync(); //Requisitar permisão para acessar posição.
    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccurary: true, //Habilitar alta precisão do GPS.
      });
      const { latitude, longitude } = coords;
      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      });
    }
  }

  if (!pedidos.length) return null;

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.mapContainer}
        initialRegion={currentRegion}
        showsUserLocation={true}
        userLocationPriority="high"
        showsMyLocationButton={true}
        enableHighAccuracy={true}
      >
        {pedidos.map((pedido, index) => (
          <Marker
            onPress={() => sheetRef.current.snapTo(0)}
            key={pedido.id}
            pinColor="#ad1409"
            /* coordinate={
            pedido.coordenadas
          } */
            coordinate={{
              latitude: parseFloat(pedido.coordenadas.latitude),
              longitude: parseFloat(pedido.coordenadas.longitude),
            }}
          />
        ))}
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 0]}
        initialSnap={1}
        borderRadius={10}
        renderHeader={bottomModalContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerModal: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: 250,
    backgroundColor: "#fff",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
  },
  containerBotoesAcoes: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoJustificarEntrega: {
    width: "50%",
    height: 44,
    backgroundColor: "#FFBF00",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  botaoConcluirEntrega: {
    width: "50%",
    height: 44,
    backgroundColor: "#248f24",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  containerDadosEntrega: {
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextoDados: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  textoDadosEsquerda: {
    fontSize: 12,
    color: colors.preto_forte,
    fontWeight: "bold",
  },
  textoDadosDireita: {
    fontSize: 12,
    color: colors.preto_fraco,
  },
  iconHideModal: {
    width: 60,
    height: 5,
    backgroundColor: "#dbdbdb",
    position: "absolute",
    top: 8,
    borderRadius: 40,
  },
});

{
  /* import MapViewDirections from "react-native-maps-directions"; */
  /* <MapViewDirections
       lineDashPattern={[0]}
        origin={origin}
        destination={destination}
        
        apikey={GOOGLE_MAPS_APIKEY}
        mode="DRIVING"
        strokeWidth={5}
        strokeColor={colors.vermelho_forte}
      /> */
}

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
import database from "../config/firebase";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

const origin = { latitude: -5.1025988, longitude: -42.7369204 };
const destination = { latitude: -5.123543, longitude: -42.804945 };

export default function MapaRota() {

  const [currentRegion, setCurrentRegion] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  function navigateBack() {
    navigation.goBack();
  }

  useEffect(() => {
    loadPedidos();
    loadInitialPosition();
    //cadastrarNovoPedido();
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

  async function cadastrarNovoPedido() {
    const novoPedido = await database.collection("pedidos").doc("BA").set({
          bairro: "Redonda",
          cep: "CA",
          cliente: "USA",
          cidade: "USA",
          complemento: "USA",
          contato: "USA",
          coordenadas: "USA",
          data_prazo: "24 de agosto de 2021 00:00:00 UTC-3",
          data_venda: "24 de agosto de 2021 00:00:00 UTC-3",
          endereco: "R1",
          numero: 2,
          numero_pedido: "USA",
          possui_rota: "USA",
          status: "USA",
          uf: "USA"
          
      })
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
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
          key={pedido.id}
          pinColor="#ad1409"
          /* coordinate={
            pedido.coordenadas
          } */
          coordinate={{ 
            latitude: parseFloat(pedido.coordenadas.latitude), 
            longitude: parseFloat(pedido.coordenadas.longitude)
          }} 
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

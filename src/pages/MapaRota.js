import React, { useState, useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import database from "../config/firebase";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

/*
const origin = { latitude: -5.1025988, longitude: -42.7369204 };
const destination = { latitude: -5.123543, longitude: -42.804945 }; 
*/

export default function MapaRota() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dadosDoPedido, setDadosDoPedido] = useState([]);
  const [pedidosEntregues, setPedidosEntregues] = useState([]);
  const [pedidosJustificados, setPedidosJustificados] = useState([]);
  
    useEffect(() => {
      loadPedidos();
      loadInitialPosition();    
    }, [pedidosEntregues]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function concluirEntrega() {
    Alert.alert(
      "Deseja concluir a entrega?",
      `Número do pedido: ${dadosDoPedido.numeroPedido}\nCliente: ${dadosDoPedido.cliente}`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const pedidoRef = database
              .collection("pedidos")
              .doc(dadosDoPedido.id);
            const response = pedidoRef.set(
              {
                status: { situacaoPedido: "concluido" },
              },
              { merge: true }
            );
            setPedidosEntregues([...pedidosEntregues, dadosDoPedido]);            
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }

  async function justificarEntrega() {
    Alert.alert(
      "Deseja justificar a entrega?",
      `Número do pedido: ${dadosDoPedido.numeroPedido}\nCliente: ${dadosDoPedido.cliente}`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const pedidoRef = database
              .collection("pedidos")
              .doc(dadosDoPedido.id);
            const response = pedidoRef.set(
              {
                status: { situacaoPedido: "justificada" },
              },
              { merge: true }
            );
            setPedidosJustificados([...pedidosJustificados, dadosDoPedido]); 
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  } 

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
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
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
        showsUserLocation={false}
        /* userLocationPriority="high"
        showsMyLocationButton={true}
        enableHighAccuracy={true} */
      >
        {pedidos.map((pedido, index) => (
          <Marker
            /* onPress={setDadosDoPedido(pedido)} */
            key={pedido.id}
            /*  pinColor="#ad1409" */
            pinColor={
              pedido.status.situacaoPedido === "pendente"
                ? "#ad1409"
                : '#065c1c'
            }
            coordinate={{
              latitude: parseFloat(pedido.coordenadas.latitude),
              longitude: parseFloat(pedido.coordenadas.longitude),
            }}
            onPress={() => {
              setModalVisible(true);
              setDadosDoPedido(pedido);
            }}
          />
        ))}
      </MapView>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        coverScreen={false}
        style={{ margin: 0, justifyContent: "flex-end" }}
        animationIn={"slideInUp"}
        hasBackdrop={true}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.containerModal}>
          <View
            style={{
              position: "absolute",
              top: 10,
              width: 80,
              height: 6,
              backgroundColor: "#cfcfcf",
              borderRadius: 10,
            }}
          ></View>
          <View style={styles.containerDadosEntrega}>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Número do pedido:</Text>
              <Text styles={styles.textoDados}>
                {dadosDoPedido.numeroPedido}
              </Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Cliente:</Text>
              <Text styles={styles.textoDados}>{dadosDoPedido.cliente}</Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Endereço:</Text>
              <Text styles={styles.textoDados}>{dadosDoPedido.endereco}</Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Complemento:</Text>
              <Text styles={styles.textoDados}>
                {dadosDoPedido.complemento}
              </Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Bairro:</Text>
              <Text styles={styles.textoDados}>{dadosDoPedido.bairro}</Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>Cidade:</Text>
              <Text styles={styles.textoDados}>{dadosDoPedido.cidade}</Text>
            </View>
            <View style={styles.containerTextDados}>
              <Text styles={styles.textoDados}>UF:</Text>
              <Text styles={styles.textoDados}>{dadosDoPedido.uf}</Text>
            </View>
          </View>
          <View style={styles.containerBotoesAcoes}>
            <TouchableOpacity
              style={styles.botaoJustificarEntrega}
              onPress={justificarEntrega}
            >
              <Text style={styles.textoBotao}>JUSTIFICAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoConcluirEntrega}
              onPress={concluirEntrega}
            >
              <Text style={styles.textoBotao}>CONCLUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    height: 300,
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
    fontFamily: fonts.title,
  },
  containerDadosEntrega: {
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextDados: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 2,
  },
  textoDados: {
    fontFamily: fonts.text,
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

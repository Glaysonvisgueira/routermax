import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import database from "../config/firebase";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function DetalhesEntrega({ route, navigation }) {
  
  const { pedido } = route.params;
  
  const currentRegion = {
    latitude: parseFloat(pedido.coordenadas.latitude),
    longitude: parseFloat(pedido.coordenadas.longitude),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBack} onPress={navigateBack}>
        <Feather name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>
      <MapView
        style={styles.mapContainer}
        initialRegion={currentRegion}
        showsUserLocation={false}
        showsCompass
        rotateEnabled={false}
      >
        <Marker          
          pinColor={colors.vermelho_forte}
          /* coordinate={
            pedido.coordenadas
          } */
          coordinate={{ 
            latitude: parseFloat(pedido.coordenadas.latitude), 
            longitude: parseFloat(pedido.coordenadas.longitude)
          }} 
        />
      </MapView>

      <View style={styles.containerDados}>
        <View style={styles.containerDadosPedido}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>{pedido.cliente}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo entrega</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerBotoesContatos}>
        <TouchableOpacity style={styles.ligarBotao}>
          <Text style={styles.textButton}>Ligar</Text>
          <Feather name="phone-call" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappBotao}>
          <Text style={styles.textButton}>Whatsapp </Text>
          <FontAwesome name="whatsapp" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.vermelho_forte,
  },
  mapContainer: {
    height: "55%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBack: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: colors.vermelho_forte,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeader: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: "#fff",
  },
  containerDados: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  containerDadosPedido: {
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textDados: {
    fontFamily: fonts.title,
    fontSize: 14,
    color: "#fff",
  },
  containerBotoesContatos: {
    flexDirection: "row",
    marginBottom: 10,
  },
  ligarBotao: {
    height: 50,
    width: "45%",
    backgroundColor: "#3348b5",
    margin: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  whatsappBotao: {
    height: 50,
    width: "49%",
    backgroundColor: "#24a33f",
    margin: 3,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "#fff",
    fontFamily: fonts.title,
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
});

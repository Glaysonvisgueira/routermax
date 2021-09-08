import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function DetalhesEntrega({ route, navigation }) {
  const { pedido } = route.params;

  const currentRegion = {
    latitude: parseFloat(pedido.coordenadas.latitude),
    longitude: parseFloat(pedido.coordenadas.longitude),
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  function enviarWhatsapp() {
    const mensagem = `Olá ${pedido.cliente}! Tudo bem?`;
    Linking.openURL(`whatsapp://send?phone=55086999277101&text=${mensagem}`);
  }

  function ligarCliente() {
    Linking.openURL(`tel:${pedido.contato}`);
  }

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <TouchableOpacity
        style={styles.iconBack}
        onPress={navigateBack}
        animated={true}
      >
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
            longitude: parseFloat(pedido.coordenadas.longitude),
          }}
        />
      </MapView>

      <View style={styles.containerDados}>
        <View style={styles.containerDadosPedido}>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Número do pedido:</Text>
            <Text style={styles.textDados}>{pedido.numeroPedido}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Data de venda:</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Prazo limite:</Text>
            <Text style={styles.textDados}>10/04/2021</Text>
          </View>

          <View style={styles.hr} />

          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Cliente:</Text>
            <Text style={styles.textDados}>{pedido.cliente.toUpperCase()}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Endereço:</Text>
            <Text style={styles.textDados}>
              {pedido.endereco.toUpperCase()}
            </Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Complemento:</Text>
            <Text style={styles.textDados}>
              {pedido.complemento.toUpperCase()}
            </Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Número:</Text>
            <Text style={styles.textDados}>{pedido.numero.toUpperCase()}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Bairro:</Text>
            <Text style={styles.textDados}>{pedido.bairro.toUpperCase()}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>CEP:</Text>
            <Text style={styles.textDados}>{pedido.cep.toUpperCase()}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>Cidade:</Text>
            <Text style={styles.textDados}>{pedido.cidade.toUpperCase()}</Text>
          </View>
          <View style={styles.containerTextHeader}>
            <Text style={styles.textDados}>UF:</Text>
            <Text style={styles.textDados}>{pedido.uf.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerBotoesContatos}>
        <TouchableOpacity style={styles.ligarBotao} onPress={ligarCliente}>
          <Text style={styles.textButton}>Ligar</Text>
          <Feather name="phone-call" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappBotao} onPress={enviarWhatsapp}>
          <Text style={styles.textButton}>Whatsapp</Text>
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
    backgroundColor: "#f2f2f2",
  },
  hr: {
    width: "100%",
    borderBottomColor: colors.preto_fraco,
    borderBottomWidth: 2,
    marginVertical: 10,
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
    borderTopColor: colors.preto_fraco,
    borderTopWidth: 4,
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
    color: colors.preto_fraco,
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

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import moment from "moment";
import database from "../config/firebase";

import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Entregas({ navigation }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    loadPedidos();
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
        //console.log(pedidos)
      });
  }

  if (!pedidos.length) return null;

  return (
    <SafeAreaView style={styles.container}>      
      <FlatList
        style={styles.containerPedidos}
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item: pedido }) => (
          <TouchableOpacity
            style={styles.pedido}
            onPress={() => navigation.navigate("DetalhesEntrega", {
              pedido: pedido              
            })}
          >
            <View>
              <Text style={{ textAlign: "left", fontFamily: fonts.text }}>
                Número do pedido:
              </Text>
              <Text style={{ textAlign: "left", fontFamily: fonts.text }}>
                Cliente:
              </Text>
              <Text style={{ textAlign: "left", fontFamily: fonts.text }}>
                Data da venda:
              </Text>
              <Text style={{ textAlign: "left", fontFamily: fonts.text }}>
                Prazo limite:
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
                {pedido.numeroPedido}
              </Text>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
                {pedido.cliente.toUpperCase()}
              </Text>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
              {moment(pedido.dataVenda).format("L")}
              </Text>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
              {moment(pedido.dataPrazo).format()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerPedidos: {
    width: width - 20,
    height: height - 100,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 4,
  },
  pedido: {
    backgroundColor: colors.cinza_muito_fraco,
    borderRadius: 4,
    margin: 4,
    position: "relative",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detalhesText: {
    flexDirection: "row",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

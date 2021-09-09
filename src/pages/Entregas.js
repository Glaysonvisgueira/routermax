import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import moment from "moment";
import database from "../config/firebase";

const { height, width } = Dimensions.get("window");

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Entregas({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [todosPedidos, setTodosPedidos] = useState([]);
  const [pedidosAtrasados, setPedidosAtrasados] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [pedidosAcimaTresDias, setPedidosAcimaTresDias] = useState([]);

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

  let options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerFilter}
      >
        <TouchableOpacity>
          <Text style={styles.filteredButton}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterButton}>Atrasado</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterButton}>Do dia</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filterButton}>Acima três dias</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        style={styles.containerPedidos}
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item: pedido }) => (
          <TouchableOpacity
            style={styles.pedido}
            onPress={() =>
              navigation.navigate("DetalhesEntrega", {
                pedido: pedido,
              })
            }
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
                {pedido.dataVenda.toDate().toLocaleDateString('pt-BR', options)}
              </Text>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
              {pedido.dataPrazo.toDate().toLocaleDateString('pt-BR', options)}
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
  containerFilter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
    marginRight: 20,
  },
  filterButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f2f2f2",
    fontSize: 16,
    fontFamily: fonts.text,
    marginHorizontal: 3,
    color: colors.preto_fraco,
  },
  filteredButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#cfcfcf",
    fontSize: 16,
    fontFamily: fonts.title,
    marginHorizontal: 3,
    color: colors.preto_forte,
  },
});

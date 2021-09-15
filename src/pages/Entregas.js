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
  TouchableWithoutFeedback,
} from "react-native";
import database from "../config/firebase";

import Loading from "../components/Loading";

const { height, width } = Dimensions.get("window");

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Entregas({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);

  //Estados dos botões de filtro
  const [isTodosActive, setIsTodosActive] = useState(true);
  const [isAtrasadossActive, setIsAtrasadossActive] = useState(false);
  const [isEmDiasActive, setIsEmDiasActive] = useState(false);
  const [isAcimaTresDiasActive, setIsAcimaTresDiasActive] = useState(false);

  const [pedidosAtrasados, setPedidosAtrasados] = useState([]);
  const [pedidosDoDia, setPedidosDoDia] = useState([]);
  const [pedidosAcimaTresDias, setPedidosAcimaTresDias] = useState([]);

  function filtrarTodasEntregas() {
    setIsEmDiasActive(false);
    setIsAcimaTresDiasActive(false);
    setIsAtrasadossActive(false);
    setIsTodosActive(true);
  }

  function filtrarEntregasAtrasadas() {
    setIsTodosActive(false);
    setIsEmDiasActive(false);
    setIsAcimaTresDiasActive(false);
    setIsAtrasadossActive(true);
  }

  function filtrarEntregasEmDias() {
    setIsTodosActive(false);
    setIsAcimaTresDiasActive(false);
    setIsAtrasadossActive(false);
    setIsEmDiasActive(true);
  }

  function filtrarEntregasAcimaTresDias() {
    setIsTodosActive(false);
    setIsEmDiasActive(false);
    setIsAtrasadossActive(false);
    setIsAcimaTresDiasActive(true);
  }

  useEffect(() => {
    loadPedidosPendentesSemRota();
    //console.log(pedidos)
  }, []);

  async function loadPedidosPendentesSemRota() {
    const pedidosRef = database.collection("pedidos");
    const query = await pedidosRef
      .where("status.situacaoPedido", "==", "pendente")
      .where("rotaInfo.possuiRota", "==", false)
      .get();
    const listaPedidos = [];
    query.forEach((doc) => {
      listaPedidos.push({ ...doc.data(), id: doc.id });
    });
    setPedidos(listaPedidos);
  }

  if (!pedidos.length && loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableWithoutFeedback
          style={{ marginHorizontal: 2 }}
          onPress={filtrarTodasEntregas}
        >
          <Text
            style={
              isTodosActive === true
                ? styles.filteredButton
                : styles.textFilterButton
            }
          >
            Todos ({pedidos.length})
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{ marginHorizontal: 2 }}
          onPress={filtrarEntregasAtrasadas}
        >
          <Text
            style={
              isAtrasadossActive === true
                ? styles.filteredButton
                : styles.textFilterButton
            }
          >
            Atrasados ({pedidosAtrasados.length})
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{ marginHorizontal: 2 }}
          onPress={filtrarEntregasEmDias}
        >
          <Text
            style={
              isEmDiasActive === true
                ? styles.filteredButton
                : styles.textFilterButton
            }
          >
            Do dia ({pedidosDoDia.length})
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={{ marginHorizontal: 2 }}
          onPress={filtrarEntregasAcimaTresDias}
        >
          <Text
            style={
              isAcimaTresDiasActive === true
                ? styles.filteredButton
                : styles.textFilterButton
            }
          >
            Acima de três dias ({pedidosAcimaTresDias.length})
          </Text>
        </TouchableWithoutFeedback>
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
                {pedido.dataVenda.toDate().toLocaleDateString("pt-BR")}
              </Text>
              <Text style={{ textAlign: "right", fontFamily: fonts.title }}>
                {pedido.dataPrazo.toDate().toLocaleDateString("pt-BR")}
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
  scrollView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },
  textFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 50,
    backgroundColor: "#F2F2F2",
    color: "#363636",
    textAlign: "center",
    margin: 4,
    fontSize: 18,
  },
  filteredButton: {
    backgroundColor: "#cb3838",
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 50,
    color: "#fff",
    textAlign: "center",
    margin: 4,
    fontSize: 18,
  },
  botaoAlerta: {
    backgroundColor: "#cb3838",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
  },
});

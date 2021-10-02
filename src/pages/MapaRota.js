import React, { useState, useEffect } from "react";
import { GOOGLE_MAPS_API_KEY } from "@env";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  getLastKnownPositionAsync,
} from "expo-location";
import database from "../config/firebase";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MapaRota() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [dadosDoPedido, setDadosDoPedido] = useState([]);

  const [pedidosEntregues, setPedidosEntregues] = useState([]);
  const [pedidosJustificados, setPedidosJustificados] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalConcluirEntregaVisible, setModalConcluirEntregaVisible] = useState(false);

  const imageS3URI =
    "https://controlmobile-dashboard.s3.sa-east-1.amazonaws.com/depositos/bac/funcionarios/chefedeposito400x400.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXNhLWVhc3QtMSJHMEUCIQD%2BpubRacq8%2B%2BQ%2BrPxl%2BWDXl4CCN6mUi4yRS5u%2BllVwXgIgdijNafD7AfKWqr3Le91d46iWzO0pl1L%2FRUiIpjtghZwq%2FwIIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw3NjUyMjAyMjcwMDUiDP4ucWHvkQRZc6SnbSrTAldnKVk6%2BnTCpX%2Brr4NY8P8fag6ki%2Fdr%2B5XdV1X%2FBRGnpkODY8WCAdUKuQaIhqVCQewUHVhf2OHVTOtBTE9Q3yDY1flBJKZ6cIOFXJSMA5%2FHU2j51YP5ecaSHOfLM5mTtKTqL7lXUvBF3u0Rsvgaqah9kcaRoqVzsbYwWUSuCwEg3UvCTJZZLAzPy6%2B%2FtVIkBoy7s7fdpgpctkxCFjjONM%2FK1CXmGk5I%2BeirRGQflSJ3wnFlBujMJWUN%2BKUR3qhGt3q3NFhWO8dHv0yX%2BbOEr2LmwEkKaXafElZB3RVaUmxBzSL1jwL6iG3SoEkEp%2B2zlz9VxZqjlL9zV1Sla5L7kpWaiJ0iTIO%2FjX6%2B8MIifTFtCQLznqVKfgnTO5RlHqS5sJdTVNm%2BjpRfhXrGpkDdqL37LSvKxI26DnizN99WMZ8qo8v2yJy8ZsbdSrf7QEQj1VcfGTCvwtGKBjqzAlWdzBgRX77CJPOau3A%2FVxDyuq73VgRuS9FD%2BkZ3F00zBe%2FRIsGxkq7DalH4kKrrsyefPos94yPmhF67gRcKD5bn3ud%2BVhNTvuPM9rWM9%2Fvqo1C75LyZEQWqn346S%2FTjZ6TDFNX%2FUR%2Bew92KSdHvvpiHnCry7clVMjYrGnnqwPntEwajYbUGp6MrebRej27pgpaozP%2BmSMrEeXMKnkoid5NkGf%2Fx5FfgwG6448Qmu9TxkdSsqZ6saDnV7dya2tSnYbgH0bXIrJ%2BjFdv2bsbAAYTOHWoclocH%2FCZYhvcwbDayHCllRRpFR%2B6Zs74kiVfX%2F%2FvOqV4SN6qbw7NyQbMf6nPXuVZ40%2Bub%2B0Ic0Oh5%2FADqt8Tl9UWlYq5hYn2YF%2BBCuFII8EXygKcHT0wWiVaZTrChqOE%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210929T125407Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3EKVOA66RDN7IAFQ%2F20210929%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b42b0a6cfa1521277033c965e99c42bcc74091b93fefcb381aa9e9f624504a39";

  useEffect(() => {
    loadInitialPosition();
  }, []);

  useEffect(() => {
    loadPedidosPendentesComRota();
  }, [pedidosEntregues]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showToastEntregaConcluida = () => {
    ToastAndroid.showWithGravity(
      "Entrega marcada como concluída com sucesso!",
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  };

  async function concluirEntrega() {
    const pedidoRef = database.collection("pedidos").doc(dadosDoPedido.id);
    const response = pedidoRef.set(
      {
        status: { situacaoPedido: "concluido" },
      },
      { merge: true }
    );
    setPedidosEntregues([...pedidosEntregues, dadosDoPedido]);
    if (response) {
      showToastEntregaConcluida();
      setModalConcluirEntregaVisible(!modalConcluirEntregaVisible);
      loadPedidosPendentesComRota();
    }
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

  async function loadPedidosPendentesComRota() {
    const pedidosRef = database.collection("pedidos");
    const query = await pedidosRef
      .where("status.situacaoPedido", "==", "pendente")
      .get();
    const listaPedidos = [];
    query.forEach((doc) => {
      listaPedidos.push({ ...doc.data(), id: doc.id });
    });
    setPedidos(listaPedidos);
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
                : "#065c1c"
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
              /* onPress={justificarEntrega} */
            >
              <Text style={styles.textoBotao}>JUSTIFICAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoConcluirEntrega}
              onPress={() => setModalConcluirEntregaVisible(true)}
            >
              <Text style={styles.textoBotao}>CONCLUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConcluirEntregaVisible}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <View style={styles.containerTitleModal}>
              <Text style={styles.modalText}>Deseja finalizar a entrega?</Text>
            </View>

            <View style={styles.containerInfoClienteModal}>
              <Image
                style={styles.imageCliente}
                source={{
                  uri: `${dadosDoPedido.avatar}`,
                }}
              />
              <View style={styles.containerTextCliente}>
                <Text style={styles.textoNomeClienteModal}>
                  {dadosDoPedido.cliente}
                </Text>
                <Text style={styles.textoNumeroPedidoModal}>
                  Pedido número: {dadosDoPedido.numeroPedido}
                </Text>
              </View>
            </View>

            <View style={styles.containerActionButtons}>
              <View style={styles.botaoAcao}>
                <TouchableOpacity
                  onPress={() =>
                    setModalConcluirEntregaVisible(!modalConcluirEntregaVisible)
                  }
                >
                  <Text style={styles.textoCancelar}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.botaoAcao}>
                <TouchableOpacity onPress={() => concluirEntrega()}>
                  <Text style={styles.textoConfirmar}>CONFIRMAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

//teste for commit

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
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    backgroundColor: "#cb3838",
    marginVertical: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerTitleModal: {
    width: "100%",
    height: 40,
    backgroundColor: "#039e00",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  modalText: {
    fontSize: 20,
    textAlign: "left",
    color: "#fff",
    fontWeight: "bold",
  },
  containerActionButtons: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAcao: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  textoCancelar: {
    fontSize: 18,
    color: "#bd0f0f",
    fontWeight: "100",
  },
  textoConfirmar: {
    fontSize: 18,
    color: "#0bb01b",
    fontWeight: "100",
  },
  imageCliente: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  containerInfoClienteModal: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
  },
  containerTextCliente: {
    marginLeft: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textoNomeClienteModal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textoNumeroPedidoModal: {
    fontSize: 14,
    color: "#969696",
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

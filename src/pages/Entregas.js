import React, { useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import database from '../config/firebase';

import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Entregas() {

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    database.collection("pedidos").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({...doc.data(), id: doc.id})
      })
      setPedidos(list)
    })
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPedidos}>
        <TouchableOpacity style={styles.pedido}>          
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Número do pedido:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Cliente:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Data da venda:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Prazo limite:</Text>
            </View>
            <View>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Número do pedido</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Cliente</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Data da venda</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Prazo limite</Text>
            </View>
          </View>
          <View style={styles.detalhesText}>            
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={colors.vermelho_forte}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pedido}>          
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Número do pedido:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Cliente:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Data da venda:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Prazo limite:</Text>
            </View>
            <View>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Número do pedido</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Cliente</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Data da venda</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Prazo limite</Text>
            </View>
          </View>
          <View style={styles.detalhesText}>            
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={colors.vermelho_forte}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pedido}>          
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Número do pedido:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Cliente:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Data da venda:</Text>
              <Text style={{textAlign: 'left', fontFamily: fonts.text}}>Prazo limite:</Text>
            </View>
            <View>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Número do pedido</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Cliente</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Data da venda</Text>
              <Text style={{textAlign: 'right', fontFamily: fonts.title}}>Prazo limite</Text>
            </View>
          </View>
          <View style={styles.detalhesText}>            
            <MaterialIcons
              name="keyboard-arrow-right"
              size={20}
              color={colors.vermelho_forte}
            />
          </View>
        </TouchableOpacity>
      </View>
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
  },
  detalhesText: {
    flexDirection: "row",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

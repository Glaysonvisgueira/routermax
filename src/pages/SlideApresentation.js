import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import supplierImg from "../assets/supplier.png";
import routeImg from "../assets/route.png";
import timeImg from "../assets/time.png";
import truckImg from "../assets/delivery-truck.png";

const { width, height } = Dimensions.get("window");

export default function SlideApresentation({ navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FFC1C1", "#fff"]}
      style={styles.container}
    >
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.containerSlide}>
          <View style={styles.containerImage}>
            <Image source={supplierImg} style={styles.img} />
          </View>

          <Text style={styles.text}>
            Organize{"\n"}Suas{"\n"}Entregas
          </Text>
          <Text style={styles.infoText}>
            O Routermax vai te ajudar a organizar todas as demandas de entregas.
          </Text>
        </View>

        <View style={styles.containerSlide}>
          <View style={styles.containerImage}>
            <Image source={routeImg} style={styles.img} />
          </View>

          <Text style={styles.text}>
          Encontre{"\n"}As melhores{"\n"}Rotas
          </Text>
          <Text style={styles.infoText}>
          Saiba quais rotas traçar para conseguir chegar ao seu destino mais
        rápido.
          </Text>
        </View>

        <View style={styles.containerSlide}>
          <View style={styles.containerImage}>
          <Image source={timeImg} style={styles.img} />
          </View>

          <Text style={styles.text}>
          Acompanhe{"\n"}Em tempo{"\n"}Real
          </Text>
          <Text style={styles.infoText}>
          Acompanhe o que acontece com cada pedido individualmente em tempo real.
          </Text>
        </View>

        

        <View style={styles.containerSlide}>
          <View style={styles.containerImage}>
          <Image source={truckImg} style={styles.img} />
          </View>

          <Text style={styles.text}>
          Aproveite{"\n"}Melhor{"\n"}O tempo
          </Text>
          <Text style={styles.infoText}>
          Otimize o tempo de planejamento das rotas e das entregas efetuadas.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.sliderPosition}>
        <View style={styles.actualSliderPosition}></View>
        <View style={styles.sliderOptions}></View>
        <View style={styles.sliderOptions}></View>
        <View style={styles.sliderOptions}></View>
      </View>
      <TouchableOpacity style={styles.buttonSkip} onPress={() => navigation.navigate('LoginPage')}>      
        <Text  style={styles.buttonSkipText}>PULAR</Text>
        
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerImage: {
    width: 290,
    height: 290,
    backgroundColor: "#fff",
    borderRadius: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.preto_forte,
    textAlign: "center",
    fontSize: 48,
    fontFamily: fonts.title,
    textAlignVertical: "center",
    marginTop: 40,
  },
  infoText: {
    color: colors.cinza_forte,
    marginTop: 10,
    marginBottom: 40,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  containerSlide: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },  
  buttonSkip: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,    
    width: 60,
    height: 48,    
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonSkipText: {
    fontFamily: fonts.title,
    color: colors.vermelho_forte
  },
  sliderPosition: {
    flexDirection: "row",
    position: "absolute",
    bottom: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderOptions: {
    width: 15,
    height: 15,
    backgroundColor: colors.cinza_fraco,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  actualSliderPosition: {
    width: 15,
    height: 15,
    backgroundColor: colors.vermelho_forte,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  img: {
    width: 140,
    height: 140,
  },
});

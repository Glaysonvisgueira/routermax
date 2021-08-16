import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import truckImg from "../assets/delivery-truck.png";

export default function SliderApresentationFour({ navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FFC1C1", "#fff"]}
      style={styles.container}
    >
      <View style={styles.containerImage}>
        <Image source={truckImg} style={styles.img} />
      </View>
      <Text style={styles.text}>
        Aproveite{"\n"}Melhor{"\n"}O tempo
      </Text>
      <Text style={styles.infoText}>
        Otimize o tempo de planejamento das rotas e das entregas efetuadas.
      </Text>
      <View style={styles.containerSlider}>
        <TouchableOpacity style={styles.buttonNext} onPress={() => navigation.navigate('SliderThree')}>
            <MaterialIcons name="keyboard-arrow-left" size={44} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.sliderPosition}>
          <View style={styles.sliderOptions}></View>
          <View style={styles.sliderOptions}></View>
          <View style={styles.sliderOptions}></View>
          <View style={styles.actualSliderPosition}></View>
        </View>
        <TouchableOpacity style={styles.buttonNext}>
        <MaterialIcons name="keyboard-arrow-right" size={44} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerImage: {
    width: 290,
    height: 290,
    backgroundColor: "#fff",
    position: "absolute",
    top: 100,
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
  },
  infoText: {
    color: colors.cinza_forte,
    marginTop: 10,
    marginBottom: 40,
    fontFamily: fonts.text,
    textAlign: "center",
  },
  containerSlider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonNext: {
    width: 60,
    height: 48,
    backgroundColor: colors.vermelho_forte,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  sliderPosition: {
    flexDirection: "row",
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

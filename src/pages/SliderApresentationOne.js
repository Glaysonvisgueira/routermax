import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import supplierImg from "../assets/supplier.png";

export default function SliderApresentationOne({ navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FFC1C1", "#fff"]}
      style={styles.container}
    >
      <View style={styles.containerImage}>
        <Image source={supplierImg} style={styles.img} />
      </View>
      <Text style={styles.text}>
        Organize{"\n"}Suas{"\n"}Entregas
      </Text>
      <Text style={styles.infoText}>
        O Routermax vai te ajudar a organizar todas as demandas de entregas.
      </Text>

      <View style={styles.containerSlider}>
        <View style={styles.fakeView}>

        </View>
        <View style={styles.sliderPosition}>
          <View style={styles.actualSliderPosition}></View>
          <View style={styles.sliderOptions}></View>
          <View style={styles.sliderOptions}></View>
          <View style={styles.sliderOptions}></View>
        </View>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => navigation.navigate("SliderTwo")}
        >
          <MaterialIcons name="navigate-next" size={44} color="#fff" />
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
  fakeView: {
    width: 60,
    height: 48,
    backgroundColor: 'transparent',   
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

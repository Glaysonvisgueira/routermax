import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";


import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MainMenu({ navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#cb3838", "#d15252", "#db6e6e"]}
      style={styles.container}
    >
      <View style={styles.containerButtonsMenu}>

        <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('MapaRota')}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={styles.icon}
              name="ios-location-sharp"
              size={30}
              color={colors.vermelho_forte}
            />

            <Text style={styles.textButton}>Minha rota</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.vermelho_forte}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMenu} onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              style={styles.icon}
              name="track-changes"
              size={30}
              color={colors.vermelho_forte}
            />
            <Text style={styles.textButton}>Rastreador</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.vermelho_forte}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMenu} onPress={() => {}}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              style={styles.icon}
              name="data-usage"
              size={30}
              color={colors.vermelho_forte}
            />
            <Text style={styles.textButton}>Dashboard</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.vermelho_forte}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('Entregas')}>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={30}
              color={colors.vermelho_forte}
              style={styles.icon}
            />
            <Text style={styles.textButton}>Entregas</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.vermelho_forte}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('Sobre')}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather
              name="info"
              style={styles.icon}
              size={30}
              color="#cb3838"
            />

            <Text style={styles.textButton}>Sobre</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={40}
            color={colors.vermelho_forte}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sairButton} onPress={() => {}}>
        <Text style={styles.textSairButton}>Sair</Text>
        <MaterialIcons name="logout" size={30} color={colors.vermelho_forte} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.vermelho_forte,
    padding: 30,
  },
  linerGradientContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: "100%",
  },
  sairButton: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 15,
    flexDirection: 'row',
  },
  textButton: {
    color: colors.vermelho_forte,
    fontFamily: fonts.title,
    fontSize: 20,
    marginLeft: 35,
    textAlign: 'center'
  },
  textSairButton: {
    color: colors.vermelho_forte,
    fontFamily: fonts.title,
    fontSize: 20,
    marginRight: 5
  },
  containerButtonsMenu: {
    width: "100%",
  },
  buttonMenu: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 100,
  },
  icon: {
    marginHorizontal: 20,
  },
});

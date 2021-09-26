import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import locationAnimation from "../assets/lotties/location.json";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MainMenu({ navigation }) {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const jsonValue = await AsyncStorage.getItem("@routermax:user");
    setUserData(JSON.parse(jsonValue));
  }

  if (!userData.length) {
    return null;
  }

  console.log(userData);

  return (
    <View style={styles.container}>
      <View style={styles.containerUserOptions}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: "https://avatars.githubusercontent.com/u/31600079?s=400&u=8fc4f58de6db3ca19c901fd31a1273627906be33&v=4",
            }}
          />
          <Text style={styles.textoUser}>Olá {userData[0].nome}!</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: "#ffffff40",
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.containerBotoes}>
        <View style={styles.containerRowBotoes}>
          <TouchableOpacity style={styles.botaoOpcao} onPress={() => navigation.navigate("MapaRota")}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                style={styles.icon}
                name="ios-location-sharp"
                size={30}
                color="#fff"
              />
            </View>
            <Text style={styles.textoBotao}>Minha rota</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoOpcao}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="data-usage" size={30} color="#fff" />
            </View>
            <Text style={styles.textoBotao}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoOpcao}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="truck-delivery"
                size={30}
                color="#fff"
              />
            </View>
            <Text style={styles.textoBotao}>Entregas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerRowBotoes}>
          <TouchableOpacity style={styles.botaoOpcao}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="info" size={30} color="#fff" />
            </View>
            <Text style={styles.textoBotao}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoOpcao}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="track-changes" size={30} color="#fff" />
            </View>
            <Text style={styles.textoBotao}>Rastreador</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoOpcao}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                backgroundColor: "#ffffff40",
              }}
            ></View>
            <Text style={styles.textoBotao}>Minha rota</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.vermelho_forte,
    padding: 20,
  },
  containerUserOptions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  containerBotoes: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerRowBotoes: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  botaoOpcao: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff40",
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  textoBotao: {
    color: "#fff",
    marginTop: 5,
    fontFamily: fonts.text,
  },
  textoUser: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 20,
    fontFamily: fonts.title,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
});

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 30,
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
    marginBottom: 20
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginHorizontal: 20,
  },
}); */

{
  /* <LinearGradient
  // Background Linear Gradient
  colors={["#fff", "#fff", "#fff"]}
  style={styles.container}
>
  <LottieView
    source={locationAnimation}
    autoPlay
    loop
    style={styles.animation}
  />
  <View style={styles.containerButtonsMenu}>
    <TouchableOpacity
      style={styles.buttonMenu}
      onPress={() => navigation.navigate("MapaRota")}
    >
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

    <TouchableOpacity
      style={styles.buttonMenu}
      onPress={() => navigation.navigate("Entregas")}
    >
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
    <TouchableOpacity
      style={styles.buttonMenu}
      onPress={() => navigation.navigate("Sobre")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="info" style={styles.icon} size={30} color="#cb3838" />

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
</LinearGradient>;
 */
}

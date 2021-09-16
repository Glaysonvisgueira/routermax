import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import database from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState([]);

  async function handleLogin() {
    const usersRef = database.collection("users");
    const findUser = await usersRef
      .where("nome", "==", user)
      .where("senha", "==", password)
      .get();
    if (findUser.empty) {
      Alert.alert(
        "Usuário/senha incorreto.",
        "Verifique as informações de usuário e senha informados.",
        [{ text: "OK" }]
      );
      return;
    }
    const dadosUsuario = [];
    findUser.forEach((doc) => {
      /* console.log(doc.id, "=>", doc.data()); */
      dadosUsuario.push({ ...doc.data(), id: doc.id });
    });
    setUserData(dadosUsuario);
    const jsonValue = JSON.stringify(userData)
    await AsyncStorage.setItem('@routermax:user', jsonValue)
    navigation.navigate("MainMenu");
  }

  /* async function handleLogin() {
    const usersRef = await database.collection("users");
    const findUser = await usersRef
      .where("nome", "==", user)
      .where("senha", "==", password)
      .get();
      
    if (findUser.empty) {
      Alert.alert(
        "Usuário/senha incorreto.",
        "Verifique as informações de usuário e senha informados.",
        [{ text: "OK" }]
      );
    } else { 
      const listaPedidos = [];
      findUser.forEach((doc) => {
        listaPedidos.push({ ...doc.data(), id: doc.id });
    });    
    b(listaPedidos);
    console.log(a)
        await AsyncStorage.setItem("@routermax:user", user);
      
      navigation.navigate("MainMenu");
    }
  } */

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containerForm}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginBotao} onPress={handleLogin}>
          <Text style={styles.textLoginBotao}>Login</Text>
          <AntDesign name="login" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textEsqueceuSenha}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.vermelho_forte,
    padding: 20,
  },
  containerForm: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 44,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    fontSize: 16,
    borderRadius: 4,
    marginVertical: 5,
    fontFamily: fonts.text,
  },
  loginBotao: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 4,
    width: "100%",
    height: 44,
    backgroundColor: colors.vermelho_forte,
    marginTop: 20,
    borderColor: "#fff",
    borderWidth: 1,
  },
  textLoginBotao: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginRight: 10,
    fontFamily: fonts.title,
  },
  textEsqueceuSenha: {
    color: "#fff",
    marginTop: 10,
    fontFamily: fonts.text,
  },
});

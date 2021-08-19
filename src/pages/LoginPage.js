
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function LoginPage({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
       
          <View style={styles.containerImg}>
          
          </View>

          <TextInput style={styles.input} placeholder="Usuário" />
          <TextInput style={styles.input} placeholder="Senha" />

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('MainMenu')}>
            <Text style={styles.textButton}>Login</Text>
            <AntDesign name="login" size={30} color="#fff" />
          </TouchableOpacity>

         
       
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cinza_fraco,
    padding: 10,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: colors.vermelho_forte,
    borderRadius: 4,
    marginTop: 15,
    flexDirection: 'row'
  },
  textButton: {
    color: '#fff',   
    fontSize: 20,
    fontFamily: fonts.title,
    marginRight: 12
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    marginVertical: 5,
    borderRadius: 4,
    padding: 12,
    width: '100%',
    color: '#696969',
    fontFamily: fonts.text_light,
  },  
  containerImg: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 500,
    marginBottom: 100,
  }, 
});

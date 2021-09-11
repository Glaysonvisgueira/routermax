import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,  
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Sobre({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.containerScrollView}>
        <Text style={styles.textScrollLegenda}>Contatos do desenvolvedor</Text>
        <ScrollView contentContainerStyle={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.cardContact} onPress={() => navigation.navigate('GithubPage')}>
          <Ionicons name="md-logo-github" size={46} color={colors.vermelho_forte} />
            <View style={styles.containerOptionsContact}>
              <Text style={styles.textScrollButton}>Github</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.vermelho_forte} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContact}>
          <MaterialCommunityIcons name="gmail" size={46} color={colors.vermelho_forte} />
            <View style={styles.containerOptionsContact}>
              <Text style={styles.textScrollButton}>E-mail</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.vermelho_forte} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContact}>
          <Ionicons name="logo-whatsapp" size={46} color={colors.vermelho_forte} />
            <View style={styles.containerOptionsContact}>
              <Text style={styles.textScrollButton}>Whatsapp</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.vermelho_forte} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContact}>
          <MaterialCommunityIcons name="telegram" size={46} color={colors.vermelho_forte} />
            <View style={styles.containerOptionsContact}>
              <Text style={styles.textScrollButton}>Telegram</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.vermelho_forte} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContact} onPress={() => navigation.navigate('LinkedinPage')}>
          <Entypo name="linkedin-with-circle" size={46} color={colors.vermelho_forte} />
            <View style={styles.containerOptionsContact}>
              <Text style={styles.textScrollButton}>LinkeDin</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color={colors.vermelho_forte} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  containerScrollView: {
    position: 'absolute',
    bottom: 15
  },
  scrollView: {
    padding: 10,
  },
  cardContact: {
    backgroundColor: '#E9E9E9',
    width: 150,
    height: 150,
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 4,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  containerOptionsContact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textScrollButton: {
    fontFamily: fonts.text,
    fontSize: 20,
    color: '#303030'
  },
  textScrollLegenda: {
    fontFamily: fonts.title,
    fontSize: 22,
    marginLeft: 10,
    color: '#303030'
  },
});

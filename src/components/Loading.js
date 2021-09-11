import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../assets/lotties/loading.json';

import colors from '../styles/colors';

export default function Loading() {
  return (
    <View style={styles.container}>
           <LottieView 
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
           />           
       </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.cinza_fraco              
    },
    animation: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    }
  });

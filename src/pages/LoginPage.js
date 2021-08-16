
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function LoginPage({ navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#FFC1C1", "#fff"]}
      style={styles.container}
    >
      
     
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
});

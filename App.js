import { StatusBar } from "expo-status-bar";
import { LogBox } from 'react-native'; 
import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_500Medium,
    Quicksand_300Light,
  });

  

LogBox.ignoreLogs(['Setting a timer']);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <Routes />
      </>
    );
  }
}

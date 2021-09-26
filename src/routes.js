import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import SlideApresentation from "./pages/SlideApresentation";
import LoginPage from "./pages/LoginPage";
import MainMenu from "./pages/MainMenu";
import MapaRota from "./pages/MapaRota";
import Sobre from "./pages/Sobre";
import Entregas from "./pages/Entregas";
import DetalhesEntrega from "./pages/DetalhesEntrega";
import GithubPage from "./pages/GithubPage";
import LinkedinPage from "./pages/LinkedinPage";

import colors from "./styles/colors";
import fonts from "./styles/fonts";

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="MapaRota"
          component={MapaRota}
          options={{
            headerShown: true,
            animation: "slide_from_right",
            title: "Mapa de rota",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: fonts.title,
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: colors.vermelho_forte },
          }}
        />
        <Stack.Screen
          name="SliderOne"
          component={SlideApresentation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false, animation: "fade" }}
        />
        
        <Stack.Screen
          name="Sobre"
          component={Sobre}
          options={{
            headerShown: true,
            animation: "slide_from_right",
            title: "Sobre",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: fonts.title,
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: colors.vermelho_forte },
          }}
        />
        <Stack.Screen
          name="Entregas"
          component={Entregas}
          options={{
            headerShown: true,
            animation: "slide_from_right",
            title: "Entregas pendentes",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: fonts.title,
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: colors.vermelho_forte },
          }}
        />
        <Stack.Screen
          name="DetalhesEntrega"
          component={DetalhesEntrega}
          options={{
            headerShown: false,
            animation: "slide_from_right",            
          }}
        />
        <Stack.Screen
          name="GithubPage"
          component={GithubPage}
          options={{
            headerShown: true,
            animation: "slide_from_right",
            title: "Código fonte (Github)",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: fonts.title,
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: colors.vermelho_forte },
          }}
        />
        <Stack.Screen
          name="LinkedinPage"
          component={LinkedinPage}
          options={{
            headerShown: true,
            animation: "slide_from_right",
            title: "LinkeDin",
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: fonts.title,
              color: "#fff",
            },
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: colors.vermelho_forte },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import SlideApresentation from "./pages/SlideApresentation";
import LoginPage from "./pages/LoginPage";
import MainMenu from "./pages/MainMenu";
import MapaRota from "./pages/MapaRota";

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SliderOne"
          component={SlideApresentation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false, animation:'slide_from_right' }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false, animation:'fade' }}
        />
        <Stack.Screen
          name="MapaRota"
          component={MapaRota}
          options={{
            headerShown: false,
            animation:'slide_from_right'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

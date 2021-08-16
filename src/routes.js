import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import SliderApresentationOne from "./pages/SliderApresentationOne";
import SliderApresentationTwo from "./pages/SliderApresentationTwo";
import SliderApresentationThree from "./pages/SliderApresentationThree";
import SliderApresentationFour from "./pages/SliderApresentationFour";

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SliderOne"
          component={SliderApresentationOne}
          options={{ headerShown: false }}
          
        />
        <Stack.Screen
          name="SliderTwo"
          component={SliderApresentationTwo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SliderThree"
          component={SliderApresentationThree}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SliderFour"
          component={SliderApresentationFour}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

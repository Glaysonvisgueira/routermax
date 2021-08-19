import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MapaRota() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestForegroundPermissionsAsync(); //Requisitar permisão para acessar posição.
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccurary: true, //Habilitar alta precisão do GPS.
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={currentRegion}
      showsUserLocation={true}
      userLocationPriority="high"
      showsMyLocationButton={true}
    >
      <Marker
        coordinate={{
          latitude: -5.094016,
          longitude: -42.768406,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

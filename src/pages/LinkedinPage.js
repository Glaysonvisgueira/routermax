import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function LinkedinPage() {
  return (
    <WebView style={styles.container} source={{ uri: "https://www.linkedin.com/in/glayson-visgueira-7433a61b3/" }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

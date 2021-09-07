import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function GithubPage() {
  return (
    <WebView style={styles.container} source={{ uri: "https://github.com/Glaysonvisgueira/routermax" }} />
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

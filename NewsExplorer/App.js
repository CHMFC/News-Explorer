import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Platform, View } from "react-native";
import React, { useState } from "react";
import Home from "./src/Home";
import Buscar from "./src/Buscar";
import BarraSuperior from "./src/BarraSuperior";
import BarraInferior from "./src/BarraInferior";

export default function App() {
  const [pagina, setPagina] = useState(1);

  const handleMudancaPagina = (codPagina) => {
    setPagina(codPagina);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <BarraSuperior/>
      </View>
      <View style={styles.mainContent}>
        {pagina == 0 ? (
          <Home/>
        ) : (
          <Buscar/>
        )}
      </View>
      <View style={styles.bottomContent}>
        <BarraInferior/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topContent: {
    width: "100%",
    height: "8%",
    backgroundColor: "rgba(100,100,255,255)",
    flexDirection: "row",
  },
  mainContent: {
    height: "89%",
    width: "100%",
    borderRadius: 20,
  },
  bottomContent: {
    marginTop: -10,
    width: "100%",
    height: "10%",
    borderRadius: 15,
    backgroundColor: "rgba(100,100,255,255)",
    flexDirection: "row",
    paddingBottom: "8%",
    paddingHorizontal: "10%",
  },
});

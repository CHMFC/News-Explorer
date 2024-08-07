import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, Platform, View } from "react-native";
import React, { useState } from "react";
import Home from "./src/Home";
import Buscar from "./src/Buscar";
import Historico from "./src/Historico";
import BarraSuperior from "./src/BarraSuperior";
import BarraInferior from "./src/BarraInferior";
import Login from "./src/Login";
import Cadastro from "./src/Cadastro";

export default function App() {
  const [pagina, setPagina] = useState(0);
  const [login, setLogin] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [initialKeyword, setInitialKeyword] = useState("");

  const handleMudancaPagina = (codPagina, keyword = "") => {
    if (codPagina === 1) {
      setInitialKeyword(keyword);
    } else if (codPagina === 5){
      setLogin(0);
      codPagina = 0;
    }
    setPagina(codPagina);
  };

  const handleLogin = (codLogin) => {
    setLogin(codLogin);
  };

  const handleAddToHistory = (keyword) => {
    const newSearch = {
      keyword,
      timestamp: new Date().toLocaleString(),
    };
    setSearchHistory((prevHistory) => [newSearch, ...prevHistory]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {login === 0 ? (
        <Login onLoginSuccess={handleLogin} /> 
      ) : login === 1 ? (
        <Cadastro onCadastroSuccess={handleLogin} /> 
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.topContent}>
            <BarraSuperior onMudancaPagina={handleMudancaPagina} />
          </View>
          <View style={styles.mainContent}>
            {pagina === 0 ? (
              <Home />
            ) : pagina === 1 ? (
              <Buscar
                onAddToHistory={handleAddToHistory}
                initialKeyword={initialKeyword}
              />
            ) : (
              <Historico
                searchHistory={searchHistory}
                onMudancaPagina={handleMudancaPagina}
              />
            )}
          </View>
          <View style={styles.bottomContent}>
            <BarraInferior onMudancaPagina={handleMudancaPagina} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(100,100,255,255)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topContent: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
  },
  mainContent: {
    width: "100%",
    height:"88%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  bottomContent: {
    width: "100%",
    height: "11%",
    borderRadius: 50,
    backgroundColor: "rgba(100,100,255,255)",
    flexDirection: "row",
    paddingBottom: "8%",
    paddingHorizontal: "10%",
  },
});

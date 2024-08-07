import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, View } from "react-native";
import React, { useState } from "react";
import Home from "./src/Home";
import Buscar from "./src/Buscar";
import Historico from "./src/Historico";
import BarraSuperior from "./src/BarraSuperior";
import BarraInferior from "./src/BarraInferior";
import Login from "./src/Login";
import Cadastro from "./src/Cadastro";
import Perfil from "./src/Perfil";

export default function App() {
  const [pagina, setPagina] = useState(0);
  const [login, setLogin] = useState(0);
  const [username, setUsername] = useState(""); // Adicionar estado para o nome de usuário
  const [searchHistory, setSearchHistory] = useState([]);
  const [initialKeyword, setInitialKeyword] = useState("");

  const handleMudancaPagina = (codPagina, keyword = "") => {
    if (codPagina === 1) {
      setInitialKeyword(keyword);
    } else if (codPagina === 5) {
      setLogin(0);
      codPagina = 0;
    }
    setPagina(codPagina);
  };

  const handleLogin = (codLogin, username = "") => {
    setLogin(codLogin);
    setUsername(username); // Definir o nome de usuário ao fazer login
  };

  const handleAddToHistory = (keyword) => {
    const newSearch = {
      keyword,
      timestamp: new Date().toLocaleString(),
    };
    setSearchHistory((prevHistory) => [newSearch, ...prevHistory]);
  };

  const handlePerfilUpdate = () => {
    Alert.alert("Sucesso", "Perfil atualizado com sucesso");
  };

  return (
    <SafeAreaView style={styles.container}>
      {login === 0 ? (
        <Login onLoginSuccess={(codLogin, username) => handleLogin(codLogin, username)} />
      ) : login === 1 ? (
        <Cadastro onCadastroSuccess={() => handleLogin(0)} />
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
            ) : pagina === 2 ? (
              <Historico
                searchHistory={searchHistory}
                onMudancaPagina={handleMudancaPagina}
              />
            ) : (
              <Perfil username={username} onPerfilUpdate={() => handleLogin(3, username)} />
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
    height: "94%",
    marginBottom: -50,
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

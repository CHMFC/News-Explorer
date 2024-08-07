import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const path = FileSystem.documentDirectory + "database/banco.csv";
      const fileExists = await FileSystem.getInfoAsync(path);

      if (!fileExists.exists) {
        Alert.alert("Erro", "Banco de dados não encontrado");
        return;
      }

      const csvData = await FileSystem.readAsStringAsync(path);
      const results = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      const user = results.data.find(
        (row) => row.username === username && row.password === password
      );

      if (user) {
        onLoginSuccess(2); // Chame a função de sucesso de login fornecida como prop
      }
      else {
        Alert.alert("Erro", "Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao ler o arquivo CSV:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login");
    }
  };

  const irParaCadastro = () => {
    onLoginSuccess(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/logoHorizontal.png")}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.loginDataContainer}>
          <Text style={styles.title}>Já tenho Conta</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress = {handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cadastroButtonContainer}>
        <TouchableOpacity onPress = {irParaCadastro} style={styles.cadastroButton}>
          <Text style={styles.cadastroText}>Fazer Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    height: "20%",
    width: "100%",
    marginTop: -100,
  },
  logoImage: {
    marginLeft: -8,
    width: "100%",
    height: "100%",
  },
  loginContainer: {
    width: "100%",
    height: "35%",
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loginDataContainer: {
    width: "80%",
    height: "70%",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "rgba(50,50,255,255)",
  },
  input: {
    height: 40,
    borderColor: "rgba(150,150,255,255)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    width: "80%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100,100,255,255)",
    borderRadius: 20,
    marginVertical: 10,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  cadastroButtonContainer: {
    width: "80%",
    height: "7%",
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  cadastroButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cadastroText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(100,100,255,255)",
  },
});

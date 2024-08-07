import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";

export default function Cadastro({ onCadastroSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    try {
      const directory = FileSystem.documentDirectory + "database/";
      const path = directory + "banco.csv";
      const directoryExists = await FileSystem.getInfoAsync(directory);

      if (!directoryExists.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const fileExists = await FileSystem.getInfoAsync(path);

      let results = { data: [] };

      if (fileExists.exists) {
        const csvData = await FileSystem.readAsStringAsync(path);
        results = Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
      }

      const userExists = results.data.some((row) => row.username === username);

      if (userExists) {
        Alert.alert("Erro", "Usuário já existe");
      } else {
        const newData = [
          ...results.data,
          { username, password, name, email },
        ];
        const newCsv = Papa.unparse(newData);

        await FileSystem.writeAsStringAsync(path, newCsv);
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
        onCadastroSuccess();
      }
    } catch (error) {
      console.error("Erro ao manipular o arquivo CSV:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar o usuário");
    }
  };

  const irParaLogin = () => {
    onCadastroSuccess(0);
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
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Repetir Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity onPress={handleCadastro} style={styles.loginButton}>
          <Text style={styles.loginText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cadastroButtonContainer}>
        <TouchableOpacity onPress={irParaLogin} style={styles.cadastroButton}>
          <Text style={styles.cadastroText}>Já tenho Conta</Text>
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
    height: "65%",
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
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100,100,255,255)",
    borderRadius: 20,
    marginTop: 50,
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

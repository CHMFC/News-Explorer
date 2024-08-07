import React, { useState, useEffect } from "react";
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

export default function Perfil({ username, onPerfilUpdate }) {
  const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const path = FileSystem.documentDirectory + "database/banco.csv";
        const fileExists = await FileSystem.getInfoAsync(path);

        if (fileExists.exists) {
          const csvData = await FileSystem.readAsStringAsync(path);
          const results = Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          });

          const user = results.data.find((row) => row.username === username);
          if (user) {
            setUserData(user);
            setPassword(user.password);
            setConfirmPassword(user.password);
            setName(user.name);
            setEmail(user.email);
          }
          else {
            Alert.alert("Erro", "Usuário não encontrado");
          }
        }
        else {
          Alert.alert("Erro", "Banco de dados não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao tentar carregar os dados do usuário"
        );
      }
    };

    loadUserData();
  }, [username]);

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    try {
      const path = FileSystem.documentDirectory + "database/banco.csv";
      const csvData = await FileSystem.readAsStringAsync(path);
      const results = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      const updatedData = results.data.map((row) =>
        row.username === username ? { username, password, name, email } : row
      );

      const newCsv = Papa.unparse(updatedData);
      await FileSystem.writeAsStringAsync(path, newCsv);

      Alert.alert("Sucesso", "Dados atualizados com sucesso");
      onPerfilUpdate();
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar atualizar os dados do usuário"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfilContainer}>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={styles.perfilDataContainer}>
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
        </View>
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.updateText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(170,170,255,255)"
  },
  logoContainer: {
    height: "20%",
    width: "100%",
    marginBottom: 20,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "rgba(50,50,255,255)",
  },
  perfilContainer: {
    width: "100%",
    height: "60%",
    borderRadius: 20,
    padding: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  perfilDataContainer: {
    width: "90%",
    height: "60%",
    borderRadius: 20,
  },
  input: {
    height: 45,
    borderColor: "rgba(150,150,255,255)",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  updateButton: {
    width: "100%",
    height: 40,
    marginTop: 50,
    backgroundColor: "rgba(100,100,255,255)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  updateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

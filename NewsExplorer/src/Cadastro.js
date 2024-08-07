import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';

export default function Cadastro({ onCadastroSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCadastro = async () => {
    try {
      const path = FileSystem.documentDirectory + 'database/banco.csv';
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

      const userExists = results.data.some(
        (row) => row.username === username
      );

      if (userExists) {
        Alert.alert('Erro', 'Usuário já existe');
      } else {
        const newData = [...results.data, { username, password }];
        const newCsv = Papa.unparse(newData);

        await FileSystem.writeAsStringAsync(path, newCsv);
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
        onCadastroSuccess();
      }
    } catch (error) {
      console.error('Erro ao manipular o arquivo CSV:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

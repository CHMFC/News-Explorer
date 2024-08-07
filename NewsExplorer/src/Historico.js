import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";

export default function Historico({ searchHistory, onMudancaPagina }) {
  return (
    <View style={styles.container}>
      <View style={styles.TitleContainerStyle}>
        <Text style={styles.TitleTextStyle}>
          Histórico de Buscas
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        {searchHistory.map((search, index) => (
          <TouchableOpacity key={index} style={styles.historyItem} onPress={() => onMudancaPagina(1, search.keyword)}>
            <Text style={styles.historyText}>{search.keyword}</Text>
            <Text style={styles.historyTimestamp}>{search.timestamp}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    alignItems: "center",
    width: "100%",
  },
  TitleContainerStyle: {
    marginBottom: 16,
    width: "90%",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  resultsContainer: {
    alignItems: "center",
    width: "100%",
  },
  historyItem: {
    marginBottom: 10,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(150,150,255,255)",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  historyText: {
    fontSize: 16,
  },
  historyTimestamp: {
    fontSize: 12,
    color: "gray",
  },
});

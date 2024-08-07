import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function App() {
  console.log("Starting App");

  let x = 1;

  return (
    <View style={styles.main}>
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>Start</Text>
          <StatusBar style="auto" />
          <View style={styles.comeco}>
            <Text>Barra</Text>
          </View>
          <View style={styles.comeco}>
            <Text>Barra</Text>
          </View>
          <View style={styles.comeco}>
            <Text>Barra</Text>
          </View>
          <View style={styles.comeco}>
            <Text>Barra</Text>
          </View>
          <View style={styles.comeco}>
            <Text>Barra</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.base}>
        <View style={styles.baseItem}>
          <Text>Barra</Text>
        </View>
        <View style={styles.baseItem}>
          <Text>Barra</Text>
        </View>
        <View style={styles.baseItem}>
          <Text>Barra</Text>
        </View>
        <View style={styles.baseItem}>
          <Text>Barra</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  base: {
    marginTop: -15,
    width: "100%",
    height: "8%",
    borderRadius: 15,
    backgroundColor: "rgba(100,100,255,255)",
    flexDirection: "row",
    paddingBottom: "5%",
    paddingHorizontal: "10%",
  },

  baseItem: {
    width: "25%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "rgba(255,100,100,255)",
  },

  mainContent: {
    height: "94%",
    width: "100%",
    borderRadius: 20,
  },

  container: {
    borderRadius: 20,
    marginTop: 60,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: 120,
  },

  comeco: {
    width: "90%",
    borderRadius: 20,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

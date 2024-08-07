import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BarraInferior() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftContainer}>
        <Text style={styles.leftContainerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightContainer}>
        <Text style={styles.RightContainerText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  leftContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "white",
  },
  leftContainerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  rightContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: "white",
  },
  RightContainerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

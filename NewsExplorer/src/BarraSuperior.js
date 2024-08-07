import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function BarraSuperior({onMudancaPagina}) {

  const irParaHome = () => {
    onMudancaPagina(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}></View>
      <TouchableOpacity onPress={irParaHome} style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/logoHorizontal.png")}
        />
      </TouchableOpacity>
      <View style={styles.rightContainer}></View>
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
    width: "30%",
    alignItems: "center",
  },
  logoContainer: {
    width: "40%",
    alignItems: "center",
  },
  logoImage: {
    marginLeft: -5,
    width: "100%",
    height: "130%",
  },
  rightContainer: {
    width: "30%",
    alignItems: "center",
  },
});

import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

export default function BarraInferior({ onMudancaPagina }) {
  const irParaHome = () => {
    onMudancaPagina(0);
  };

  const irParaBuscar = () => {
    onMudancaPagina(1);
  };

  const irParaHistorico = () => {
    onMudancaPagina(2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={irParaHistorico} style={styles.leftContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/historico.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={irParaHome} style={styles.centerConteiner}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/home.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={irParaBuscar} style={styles.rightContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/buscar.png")}
        />
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
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "white",
    paddingRight: 25,
  },
  logoImage: {
    width: "100%",
    height: "50%",
  },
  centerConteiner: {
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "white",
  },
  rightContainer: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: "white",
    paddingLeft: 20,
  },
});

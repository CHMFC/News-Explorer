import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function BarraSuperior({ onMudancaPagina }) {
  const irParaHome = () => {
    onMudancaPagina(0);
  };

  const irParaPerfil = () => {
    onMudancaPagina(4);
  };

  const irParaExit = () => {
    onMudancaPagina(5);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={irParaPerfil} style={styles.leftContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoUser}
          source={require("../assets/user.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={irParaHome} style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/logoHorizontal.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={irParaExit} style={styles.rightContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoExit}
          source={require("../assets/exit.png")}
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
    alignItems: "flex-start",
  },
  logoContainer: {
    width: "40%",
    alignItems: "center",
  },
  logoUser: {
    width: "60%",
    height: "50%",
  },
  logoImage: {
    marginLeft: -8,
    width: "100%",
    height: "130%",
  },
  logoExit: {
    width: "60%",
    height: "50%",
  },
  rightContainer: {
    width: "30%",
    alignItems: "flex-end",
  },
});

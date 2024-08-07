import { View, StyleSheet, Image } from "react-native";

export default function BarraSuperior() {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}></View>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require("../assets/logoHorizontal.png")}
        />
      </View>
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
    width: "100%",
    height: "100%",
  },
  rightContainer: {
    width: "30%",
    alignItems: "center",
  },
});

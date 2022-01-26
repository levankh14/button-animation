import { StatusBar } from "expo-status-bar";
import { StyleSheet,View } from "react-native";
import Cart from "./components/Cart";

import Favorites from "./components/Favorites";

const WIDTH = 296;
const HEIGHT = 104;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Cart />
      {/* <Favorites /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    // alignItems: "center",
    // justifyContent: "center",
  },

});

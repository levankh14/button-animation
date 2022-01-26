import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SquircleView } from "react-native-figma-squircle";

const WIDTH = 296;
const HEIGHT = 104;

export default function Favorites() {
  const [text, setText] = useState(0);
  const addFavoritesValue = useSharedValue(1);
  const cartValue = useSharedValue(-200);
  const addFavoritesOpacityValue = useSharedValue(1);
  const thirdOpacityValue = useSharedValue(0);
  const dangerIconValue = useSharedValue(20);
  const dangerRotateValue = useSharedValue(-120);
  const addFavoriteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: addFavoritesValue.value }],
      opacity: addFavoritesOpacityValue.value,
    };
  });
  const cartItemsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: cartValue.value }],
    };
  });
  const unfavoriteStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: dangerIconValue.value },
        { rotateZ: `${dangerRotateValue.value}deg` },
      ],
      opacity: thirdOpacityValue.value,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
      activeOpacity={1}
        onPress={() => {
          if (text === 0) {
            addFavoritesValue.value = withSpring(20, {}, () => {
              cartValue.value = withSpring(-200);
              thirdOpacityValue.value = withSpring(1);
              dangerIconValue.value = withTiming(1);
              addFavoritesOpacityValue.value = withTiming(0);
              dangerRotateValue.value = withSpring(0);
              runOnJS(setText)(2);
            });
            cartValue.value = withSpring(-30);
            addFavoritesOpacityValue.value = withTiming(1);
            setText(1);
          } else  {
            addFavoritesValue.value = 1;
            cartValue.value = -200;
            thirdOpacityValue.value = 0;
            dangerIconValue.value = withTiming(20);
            addFavoritesOpacityValue.value = 1;
            dangerRotateValue.value = -120;
            setText(0);
          }
        }}
      
      >
        <SquircleView
          squircleParams={{
            cornerSmoothing: 0.9,
            cornerRadius: 24,
            fillColor: text === 0 ? "#7599F1" : "#E15933",
          }}
          style={[
            styles.cont,
          ]}
        >
          <Animated.View
            style={[
              {
                height: 40,
                width: 40,
                borderRadius: 100,
              },
              addFavoriteStyle,
            ]}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              source={require("../assets/1.png")}
            />
          </Animated.View>
          <Animated.View style={[{ height: 44, width: 44 }, cartItemsStyle]}>
            <Image
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
              source={require("../assets/Buy.png")}
            />
          </Animated.View>
          <Animated.View
            style={[
              { height: 54, width: 54, position: "absolute", left: 60 },
              unfavoriteStyle,
            ]}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
              source={require("../assets/danger.png")}
            />
          </Animated.View>

          {text === 0 ? (
            <Text style={[styles.text, { marginLeft: -18 }]}>
              Add to Favorites
            </Text>
          ) : text === 1 ? (
            <Text style={styles.text}>44 Items </Text>
          ) : (
            <Text style={[styles.text, { color: "white" }]}>Unfavorite</Text>
          )}
        </SquircleView>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  cont: {
    height: HEIGHT,
    width: WIDTH,
    borderRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 50,
    flexDirection: "row",
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
});

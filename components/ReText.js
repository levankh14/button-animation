import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const styles = StyleSheet.create({
  baseStyle: {
    color: "black",
  },
});
Animated.addWhitelistedNativeProps({ text: true });



const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ReText = (props) => {
  const { text, style } = { style: {}, ...props };
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
  });
  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[styles.baseStyle, style]}
      {...{ animatedProps }}
    />
  );
};

export default ReText;
import { ReactNode } from "react";
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface ScreenContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ScreenContainer({ children, style }: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});

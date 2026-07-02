import { DimensionValue, StyleSheet, View } from "react-native";

export function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progressPercentage =
    `${(currentStep / totalSteps) * 100}%` as DimensionValue;

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: progressPercentage }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#CCD1EE",
  },

  progress: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#E3350D",
  },
});

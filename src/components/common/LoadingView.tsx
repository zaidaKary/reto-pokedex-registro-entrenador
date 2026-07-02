import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function LoadingView({
  message = "Cargando...",
  compact = false,
}: {
  message?: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <ActivityIndicator size="large" color="#E3350D" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
  },

  compact: {
    flex: 0,
    paddingVertical: 24,
  },

  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
});

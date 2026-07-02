import { Pressable, StyleSheet, Text, View } from "react-native";

export function ErrorView({
  message = "Ha ocurrido un error.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocurrió un problema</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable onPress={onRetry} style={styles.button}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  message: {
    marginVertical: 12,
    textAlign: "center",
    color: "#555",
  },

  button: {
    backgroundColor: "#E3350D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

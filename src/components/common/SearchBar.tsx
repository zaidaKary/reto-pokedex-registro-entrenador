import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export function SearchBar({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    fontSize: 16,
    color: "#000000",
  },
});

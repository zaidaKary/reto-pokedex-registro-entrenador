import { Image, StyleSheet, Text, View } from "react-native";

interface PokemonHeaderProps {
  id: number;
  name: string;
  image: string;
}

export function PokemonHeader({ id, name, image }: PokemonHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.id}>#{id.toString().padStart(3, "0")}</Text>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: -100,
    marginBottom: 20,
  },

  image: {
    width: 150,
    height: 150,
  },

  id: {
    color: "#777",
    marginTop: 8,
    fontSize: 16,
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

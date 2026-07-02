import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../constants/pokemon";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { getPokemonId, getPokemonImage } from "../../utils/pokemon";
import { PokemonTypeBadge } from "./PokemonTypeBadge";

interface PokemonCardProps {
  name: string;
  url: string;
  onPress: () => void;
}

export function PokemonCard({ name, url, onPress }: PokemonCardProps) {
  const id = getPokemonId(url);
  const { data } = usePokemonDetail(url);
  const types = data?.types.map((t) => t.type.name) ?? [];
  const primaryColor = POKEMON_TYPE_COLORS[types[0]] ?? "#999999";

  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${name} - Pokémon número ${id}`}
      accessibilityHint="Toca para ver detalles"
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: primaryColor },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={styles.id}>#{id.toString().padStart(3, "0")}</Text>
        <Text style={styles.name}>{name}</Text>
        {types?.length > 0 && (
          <View style={styles.types}>
            {types.map((type) => (
              <PokemonTypeBadge
                key={type}
                type={type}
                badgeStyle={styles.badge}
                textStyle={styles.badgeText}
              />
            ))}
          </View>
        )}
      </View>
      <Image
        source={{
          uri: getPokemonImage(id),
        }}
        style={styles.image}
      />
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderLeftWidth: 5,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  pressed: {
    opacity: 0.8,
  },

  info: {
    flex: 1,
  },

  id: {
    color: "#999",
    marginBottom: 6,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginLeft: -4,
  },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    marginHorizontal: 2,
  },

  badgeText: {
    fontSize: 11,
  },

  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
});

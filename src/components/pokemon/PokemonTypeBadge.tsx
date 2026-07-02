import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { POKEMON_TYPE_COLORS } from "../../constants/pokemon";

interface PokemonTypeBadgeProps {
  type: string;
  badgeStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export function PokemonTypeBadge({
  type,
  badgeStyle,
  textStyle,
}: PokemonTypeBadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: POKEMON_TYPE_COLORS[type] ?? "#999999" },
        badgeStyle,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },

  text: {
    color: "#FFF",
    fontWeight: "700",
    textTransform: "capitalize",
  },
});

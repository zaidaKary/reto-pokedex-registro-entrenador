import { StyleSheet, Text, View } from "react-native";

interface PokemonStatBarProps {
  label: string;
  value: number;
  color?: string;
}

export function PokemonStatBar({
  label,
  value,
  color = "#4CAF50",
}: PokemonStatBarProps) {
  const percentage = Math.min(value, 100); // Algunas estadísticas superan 100 , limitamos visualmente la barra al 100%

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.bar,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  label: {
    fontWeight: "600",
    textTransform: "capitalize",
  },

  value: {
    fontWeight: "700",
  },

  barBackground: {
    height: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    overflow: "hidden",
  },

  bar: {
    height: "100%",
    borderRadius: 8,
  },
});

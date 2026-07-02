import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { getPokemonImage } from "../../utils/pokemon";

interface PokemonEvolutionChainProps {
  stages: {
    name: string;
    id: number;
  }[];
  currentId: number;
  highlightColor: string;
}

export function PokemonEvolutionChain({
  stages,
  currentId,
  highlightColor,
}: PokemonEvolutionChainProps) {
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => {
        const isCurrent = stage.id === currentId;

        return (
          <View key={stage.id} style={styles.stageRow}>
            {index > 0 && (
              <Ionicons
                testID="evolution-arrow"
                name="arrow-forward"
                size={20}
                color="#999999"
                style={styles.arrow}
              />
            )}
            <View style={styles.stage}>
              <View
                style={[
                  styles.imageWrapper,
                  isCurrent && {
                    borderColor: highlightColor,
                    borderWidth: 3,
                  },
                ]}
              >
                <Image
                  source={{ uri: getPokemonImage(stage.id) }}
                  style={styles.image}
                />
              </View>
              <Text
                style={[styles.name, isCurrent && styles.currentName]}
                numberOfLines={1}
              >
                {stage.name}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },

  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  arrow: {
    marginBottom: 20,
  },

  stage: {
    alignItems: "center",
    gap: 8,
  },

  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "transparent",
  },

  image: {
    width: 64,
    height: 64,
  },

  name: {
    fontSize: 12,
    color: "#999999",
    textTransform: "capitalize",
    maxWidth: 80,
    textAlign: "center",
  },

  currentName: {
    color: "#222",
    fontWeight: "700",
  },
});

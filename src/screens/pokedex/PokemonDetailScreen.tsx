import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ErrorView } from "../../components/common/ErrorView";
import { PokemonEvolutionChain } from "../../components/pokemon/PokemonEvolutionChain";
import { PokemonHeader } from "../../components/pokemon/PokemonHeader";
import { PokemonStatBar } from "../../components/pokemon/PokemonStatBar";
import { PokemonTypeBadge } from "../../components/pokemon/PokemonTypeBadge";
import { ShimmerLoader } from "../../components/pokemon/ShimmerLoader";
import { POKEMON_TYPE_COLORS } from "../../constants/pokemon";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { usePokemonEvolutionChain } from "../../hooks/usePokemonEvolutionChain";
import { usePokemonSpecies } from "../../hooks/usePokemonSpecies";
import { PokedexStackParamList } from "../../types/navigation";

type RouteProps = RouteProp<PokedexStackParamList, "PokemonDetail">;

export function PokemonDetailScreen() {
  const route = useRoute<RouteProps>();
  const { url } = route.params;
  const { data, isLoading, isError, refetch } = usePokemonDetail(url);
  const { data: species } = usePokemonSpecies(data?.id ?? 0);
  const { data: evolutionStages } = usePokemonEvolutionChain(
    species?.evolutionChainUrl ?? ""
  );

  const isLoadingAll = isLoading || !species || !evolutionStages;

  if (isLoadingAll) {
    return <ShimmerLoader />;
  }

  if (isError || !data) {
    return (
      <ErrorView
        message="No fue posible obtener el Pokémon."
        onRetry={refetch}
      />
    );
  }

  const artwork = data.sprites.other["official-artwork"].front_default;
  const primaryType = data.types[0].type.name;
  const backgroundColor = POKEMON_TYPE_COLORS[primaryType] ?? "#F5F5F5";

  return (
    <View style={[styles.screen, { backgroundColor: backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <PokemonHeader id={data.id} name={data.name} image={artwork} />
          <View style={styles.badges}>
            {data.types.map((item) => (
              <PokemonTypeBadge key={item.slot} type={item.type.name} />
            ))}
          </View>
          {species?.description ? (
            <Text style={styles.description}>{species.description}</Text>
          ) : null}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>WEIGHT</Text>
              <Text style={styles.infoValue}>
                {(data.weight / 10).toFixed(1)} KG
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>HEIGHT</Text>
              <Text style={styles.infoValue}>
                {(data.height / 10).toFixed(1)} M
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {data.stats.map((stat) => (
            <PokemonStatBar
              key={stat.stat.name}
              label={stat.stat.name}
              value={stat.base_stat}
              color={backgroundColor}
            />
          ))}
          {evolutionStages && evolutionStages?.length > 1 && (
            <>
              <View style={styles.separator} />
              <Text style={styles.sectionTitle}>Evolution Chain</Text>
              <PokemonEvolutionChain
                stages={evolutionStages}
                currentId={data.id}
                highlightColor={backgroundColor}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  scroll: {
    padding: 20,
  },

  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 24,
    marginTop: 80,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },

  badges: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  description: {
    textAlign: "center",
    color: "#000000",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
  },

  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  separator: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginBottom: 24,
  },
});

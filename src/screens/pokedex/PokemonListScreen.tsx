import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ErrorView } from "../../components/common/ErrorView";
import { LoadingView } from "../../components/common/LoadingView";
import { ScreenContainer } from "../../components/common/ScreenContainer";
import { SearchBar } from "../../components/common/SearchBar";
import { PokemonCard } from "../../components/pokemon/PokemonCard";
import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonSearch } from "../../hooks/usePokemonSearch";
import { PokedexStackParamList } from "../../types/navigation";

type NavigationProp = NativeStackNavigationProp<PokedexStackParamList>;

export function PokemonListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const { data: searchData } = usePokemonSearch();

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];

  const displayedPokemons = useMemo(() => {
    if (!search.trim()) {
      return pokemons;
    }
    return (
      searchData?.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      ) ?? []
    );
  }, [pokemons, search, searchData]);

  if (isLoading) {
    return <LoadingView message="Cargando Pokédex..." />;
  }

  if (isError) {
    return (
      <ErrorView
        message="No fue posible obtener la lista de Pokémon."
        onRetry={refetch}
      />
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={displayedPokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            url={item.url}
            onPress={() =>
              navigation.navigate("PokemonDetail", {
                name: item.name,
                url: item.url,
              })
            }
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="book-outline" size={30} color="#1A1A1A" />
              <Text style={styles.title}>Lista de Pokédex</Text>
            </View>

            <Text style={styles.subtitle}>
              Explora los Pokémon y descubre sus estadísticas.
            </Text>
            <SearchBar value={search} onChangeText={setSearch} />
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <LoadingView compact message="Cargando más Pokémon..." />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No se encontraron Pokémon.</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (search.trim()) {
            return;
          }

          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#000000",
    lineHeight: 22,
  },

  listContent: {
    paddingBottom: 24,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});

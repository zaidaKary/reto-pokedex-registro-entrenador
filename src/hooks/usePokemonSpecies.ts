import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../api/pokemon";

export function usePokemonSpecies(id: number) {
  return useQuery({
    queryKey: ["pokemon-species", id],
    queryFn: () => getPokemonSpecies(id),
    enabled: !!id,
    select: (data) => {
      const entry = data.flavor_text_entries.find(
        (e) => e.language.name === "en",
      );
      return {
        description:
          entry?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ") ?? "",
        evolutionChainUrl: data.evolution_chain.url,
      };
    },
  });
}

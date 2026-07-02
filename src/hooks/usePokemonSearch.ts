import { useQuery } from "@tanstack/react-query";
import { getPokemonSearchList } from "../api/pokemon";

export function usePokemonSearch() {
  return useQuery({
    queryKey: ["pokemon-search"],
    queryFn: getPokemonSearchList,
    staleTime: Infinity,
  });
}
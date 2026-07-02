import { useQuery } from "@tanstack/react-query";
import { getPokemonEvolutionChain } from "../api/pokemon";
import { flattenChain } from "../utils/pokemon";

export function usePokemonEvolutionChain(url: string) {
  return useQuery({
    queryKey: ["evolution-chain", url],
    queryFn: () => getPokemonEvolutionChain(url),
    enabled: !!url,
    select: (data) => flattenChain(data.chain),
  });
}

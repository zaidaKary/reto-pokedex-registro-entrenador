import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "../api/pokemon";

export function usePokemonDetail(url: string) {
  return useQuery({
    queryKey: ["pokemon-detail", url],
    queryFn: () => getPokemonDetail(url),
    enabled: !!url,
  });
}

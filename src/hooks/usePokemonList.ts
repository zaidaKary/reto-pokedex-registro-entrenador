import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../api/pokemon";

const LIMIT = 20;

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ["pokemon-list"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getPokemonList(pageParam, LIMIT),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) {
        return undefined;
      }
      const nextUrl = new URL(lastPage.next);
      return Number(nextUrl.searchParams.get("offset"));
    },
  });
}

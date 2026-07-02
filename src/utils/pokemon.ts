import { ChainLink } from "../types/pokemon";

export function getPokemonId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function getPokemonImage(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function flattenChain(
  link: ChainLink,
): { name: string; id: number }[] {
  const current = {
    name: link.species.name,
    id: getPokemonId(link.species.url),
  };
  if (link.evolves_to.length === 0) {
    return [current];
  }
  return [current, ...flattenChain(link.evolves_to[0])];
}

export function getBaseUrl(): string {
  return process.env.EXPO_PUBLIC_POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2";
}
import {
  EvolutionChain,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
} from "../types/pokemon";
import { getBaseUrl } from "../utils/pokemon";

export async function getPokemonList(
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${getBaseUrl()}/pokemon?offset=${offset}&limit=${limit}`
  );

  if (!response.ok) {
    const error = new Error("Error obteniendo la lista de Pokémon");
    console.error(error.message, { status: response.status });
    throw error;
  }

  return response.json();
}

export async function getPokemonDetail(url: string): Promise<PokemonDetail> {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("No se pudo obtener el detalle del Pokémon");
    console.error(error.message, { status: response.status });
    throw error;
  }

  return response.json();
}

export async function getPokemonSearchList(): Promise<PokemonListResponse> {
  const response = await fetch(`${getBaseUrl()}/pokemon?limit=20000`);

  if (!response.ok) {
    const error = new Error("Error obteniendo los Pokémon");
    console.error(error.message, { status: response.status });
    throw error;
  }

  return response.json();
}

export async function getPokemonSpecies(id: number): Promise<PokemonSpecies> {
  const response = await fetch(`${getBaseUrl()}/pokemon-species/${id}`);

  if (!response.ok) {
    const error = new Error("No se pudo obtener la descripción del Pokémon");
    console.error(error.message, { status: response.status });
    throw error;
  }

  return response.json();
}

export async function getPokemonEvolutionChain(
  url: string
): Promise<EvolutionChain> {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "No se pudo obtener la cadena evolutiva del Pokémon"
    );
    console.error(error.message, { status: response.status });
    throw error;
  }

  return response.json();
}

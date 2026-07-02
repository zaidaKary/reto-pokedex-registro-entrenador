import { PokemonListItem, PokemonListResponse } from "./pokemon";

export type PokedexStackParamList = {
  PokemonList: PokemonListResponse;
  PokemonDetail: PokemonListItem;
};

export type TrainerStackParamList = {
  Trainer: undefined;
};

export type RootTabParamList = {
  Pokedex: undefined;
  Trainer: undefined;
};

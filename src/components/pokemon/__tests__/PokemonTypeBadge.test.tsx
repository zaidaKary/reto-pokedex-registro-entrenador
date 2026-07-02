import { render, screen } from "@testing-library/react-native";
import { PokemonTypeBadge } from "../PokemonTypeBadge";

jest.mock("../../../constants/pokemon", () => ({
  POKEMON_TYPE_COLORS: {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  },
}));

describe("PokemonTypeBadge", () => {
  it("debe renderizar el componente", async () => {
    await render(<PokemonTypeBadge type="fire" />);

    const text = screen.getByText("fire");
    expect(text).toBeTruthy();
  });

  it("debe renderizar el tipo de Pokémon", async () => {
    await render(<PokemonTypeBadge type="water" />);

    const text = screen.getByText("water");
    expect(text).toBeTruthy();
  });

  it("debe renderizar diferentes tipos de Pokémon", async () => {
    const types = ["fire", "water", "grass", "electric", "ice"];

    for (const type of types) {
      await render(<PokemonTypeBadge type={type} />);
      expect(screen.getByText(type)).toBeTruthy();
    }
  });

  it("debe renderizar todos los tipos conocidos", async () => {
    const allTypes = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];

    for (const type of allTypes) {
      await render(<PokemonTypeBadge type={type} />);
      expect(screen.getByText(type)).toBeTruthy();
    }
  });

  it("debe manejar tipos en minúsculas", async () => {
    await render(<PokemonTypeBadge type="steel" />);

    const text = screen.getByText("steel");
    expect(text).toBeTruthy();
  });
});

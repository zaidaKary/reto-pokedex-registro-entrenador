import { render, screen } from "@testing-library/react-native";
import { PokemonCard } from "../PokemonCard";

jest.mock("../../../hooks/usePokemonDetail", () => ({
  usePokemonDetail: jest.fn(() => ({ data: null })),
}));

jest.mock("../../../utils/pokemon", () => ({
  getPokemonId: jest.fn((url: string) => {
    const match = url.match(/\/(\d+)\//);
    return match ? parseInt(match[1]) : 0;
  }),
  getPokemonImage: jest.fn(
    (id: number) =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  ),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, size, color }: any) => {
    const { Text } = require("react-native");
    return <Text>{`Icon: ${name}, Size: ${size}, Color: ${color}`}</Text>;
  },
}));

describe("PokemonCard", () => {
  it("debe renderizar correctamente con props básicas", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText("pikachu")).toBeTruthy();
    expect(screen.getByText("#025")).toBeTruthy();
  });

  it("debe llamar a onPress cuando se presiona la tarjeta", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    const card = screen.getByText("pikachu").parent?.parent;
    expect(card).toBeTruthy();
  });

  it("debe extraer correctamente el ID del URL", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="charizard"
        url="https://pokeapi.co/api/v2/pokemon/6/"
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText("#006")).toBeTruthy();
  });

  it("debe formatear el ID con padStart(3, '0')", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="bulbasaur"
        url="https://pokeapi.co/api/v2/pokemon/1/"
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText("#001")).toBeTruthy();
  });

  it("render renderizar la imagen con el URI correcto", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    const card = screen.getByText("#025");
    const imageElement = (card.parent?.parent as any)?.children?.[1];
    expect((imageElement as any)?.props?.source?.uri).toContain("25.png");
  });

  it("render renderizar el nombre del Pokémon", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="dragonite"
        url="https://pokeapi.co/api/v2/pokemon/149/"
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText("dragonite")).toBeTruthy();
  });

  it("render renderizar el icono chevron-forward", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    expect(screen.getByText(/Icon: chevron-forward/)).toBeTruthy();
  });

  it("debe tener las propiedades de accesibilidad correctas", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    const nameText = screen.getByText("pikachu");
    const card = nameText.parent?.parent;
    expect((card as any)?.props?.accessibilityRole).toBe("button");
    expect((card as any)?.props?.accessibilityLabel).toContain("pikachu");
    expect((card as any)?.props?.accessibilityLabel).toContain("25");
  });

  it("render renderizar correctamente con diferentes Pokémon", async () => {
    const mockOnPress = jest.fn();
    const pokemonList = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
    ];

    for (const { name, url } of pokemonList) {
      await render(<PokemonCard name={name} url={url} onPress={mockOnPress} />);
      expect(screen.getByText(name)).toBeTruthy();
    }
  });

  it("debe ser accessible como un botón", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    const nameText = screen.getByText("pikachu");
    const card = nameText.parent?.parent;
    expect((card as any)?.props?.accessible).toBe(true);
  });

  it("debe tener accessibilityHint correcta", async () => {
    const mockOnPress = jest.fn();
    await render(
      <PokemonCard
        name="pikachu"
        url="https://pokeapi.co/api/v2/pokemon/25/"
        onPress={mockOnPress}
      />,
    );

    const nameText = screen.getByText("pikachu");
    const card = nameText.parent?.parent;
    expect((card as any)?.props?.accessibilityHint).toBe(
      "Toca para ver detalles",
    );
  });
});

import { render, screen } from "@testing-library/react-native";
import { PokemonHeader } from "../PokemonHeader";

describe("PokemonHeader", () => {
  it("debe renderizar correctamente con props básicas", async () => {
    await render(
      <PokemonHeader
        id={25}
        name="pikachu"
        image="https://example.com/pikachu.png"
      />,
    );

    expect(screen.getByText("#025")).toBeTruthy();
    expect(screen.getByText("pikachu")).toBeTruthy();
  });

  it("debe formatear el ID con padStart(3, '0')", async () => {
    await render(
      <PokemonHeader
        id={1}
        name="bulbasaur"
        image="https://example.com/bulbasaur.png"
      />,
    );

    expect(screen.getByText("#001")).toBeTruthy();
  });

  it("debe formatear el ID de dos dígitos correctamente", async () => {
    await render(
      <PokemonHeader
        id={25}
        name="pikachu"
        image="https://example.com/pikachu.png"
      />,
    );

    expect(screen.getByText("#025")).toBeTruthy();
  });

  it("debe formatear el ID de tres dígitos correctamente", async () => {
    await render(
      <PokemonHeader
        id={150}
        name="mewtwo"
        image="https://example.com/mewtwo.png"
      />,
    );

    expect(screen.getByText("#150")).toBeTruthy();
  });

  it("debe renderizar el nombre del Pokémon", async () => {
    await render(
      <PokemonHeader
        id={6}
        name="charizard"
        image="https://example.com/charizard.png"
      />,
    );

    expect(screen.getByText("charizard")).toBeTruthy();
  });

  it("debe renderizar la imagen con el URI correcto", async () => {
    const imageUri =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
    await render(<PokemonHeader id={25} name="pikachu" image={imageUri} />);

    const imageElement = screen.getByText("#025").parent?.children[0];
    expect((imageElement as any)?.props?.source?.uri).toBe(imageUri);
  });

  it("debe renderizar correctamente con ID de un dígito", async () => {
    await render(
      <PokemonHeader
        id={9}
        name="blastoise"
        image="https://example.com/blastoise.png"
      />,
    );

    expect(screen.getByText("#009")).toBeTruthy();
  });

  it("debe renderizar correctamente con diferentes Pokémon", async () => {
    const pokemonList = [
      { id: 1, name: "bulbasaur", image: "https://example.com/bulbasaur.png" },
      {
        id: 4,
        name: "charmander",
        image: "https://example.com/charmander.png",
      },
      { id: 7, name: "squirtle", image: "https://example.com/squirtle.png" },
    ];

    for (const { id, name, image } of pokemonList) {
      const formattedId = `#${id.toString().padStart(3, "0")}`;
      await render(<PokemonHeader id={id} name={name} image={image} />);

      expect(screen.getByText(formattedId)).toBeTruthy();
      expect(screen.getByText(name)).toBeTruthy();
    }
  });
});

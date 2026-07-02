import { render, screen } from "@testing-library/react-native";
import { PokemonEvolutionChain } from "../PokemonEvolutionChain";

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: ({ testID, ...props }: any) => <View testID={testID} {...props} />,
  };
});

jest.mock("../../../utils/pokemon", () => ({
  getPokemonImage: jest.fn(
    (id: number) =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  ),
}));

const mockStages = [
  { id: 1, name: "bulbasaur" },
  { id: 2, name: "ivysaur" },
  { id: 3, name: "venusaur" },
];

describe("PokemonEvolutionChain", () => {
  it("debe renderizar correctamente una sola etapa", async () => {
    await render(
      <PokemonEvolutionChain
        stages={[{ id: 25, name: "pikachu" }]}
        currentId={25}
        highlightColor="#F5D100"
      />,
    );

    expect(screen.getByText("pikachu")).toBeTruthy();
  });

  it("debe renderizar el nombre de cada etapa", async () => {
    await render(
      <PokemonEvolutionChain
        stages={mockStages}
        currentId={1}
        highlightColor="#78C850"
      />,
    );

    expect(screen.getByText("bulbasaur")).toBeTruthy();
    expect(screen.getByText("ivysaur")).toBeTruthy();
    expect(screen.getByText("venusaur")).toBeTruthy();
  });

  it("debe mostrar flechas entre etapas pero no antes de la primera", async () => {
    await render(
      <PokemonEvolutionChain
        stages={mockStages}
        currentId={1}
        highlightColor="#78C850"
      />,
    );

    const arrows = screen.getAllByTestId("evolution-arrow");
    expect(arrows).toHaveLength(2);
  });

  it("no debe mostrar flecha con una sola etapa", async () => {
    await render(
      <PokemonEvolutionChain
        stages={[{ id: 25, name: "pikachu" }]}
        currentId={25}
        highlightColor="#F5D100"
      />,
    );

    expect(screen.queryByTestId("evolution-arrow")).toBeNull();
  });

  it("debe mostrar una flecha con dos etapas", async () => {
    await render(
      <PokemonEvolutionChain
        stages={[
          { id: 4, name: "charmander" },
          { id: 5, name: "charmeleon" },
        ]}
        currentId={4}
        highlightColor="#F08030"
      />,
    );

    const arrows = screen.getAllByTestId("evolution-arrow");
    expect(arrows).toHaveLength(1);
  });

  it("debe aplicar el borde de resaltado a la etapa actual", async () => {
    await render(
      <PokemonEvolutionChain
        stages={mockStages}
        currentId={2}
        highlightColor="#78C850"
      />,
    );

    const currentName = screen.getByText("ivysaur");
    const imageWrapper = (currentName.parent as any)?.children?.[0];
    expect((imageWrapper as any)?.props?.style?.[1]?.borderColor).toBe(
      "#78C850",
    );
    expect((imageWrapper as any)?.props?.style?.[1]?.borderWidth).toBe(3);
  });

  it("no debe aplicar borde a las etapas que no son la actual", async () => {
    await render(
      <PokemonEvolutionChain
        stages={mockStages}
        currentId={2}
        highlightColor="#78C850"
      />,
    );

    const nonCurrentName = screen.getByText("bulbasaur");
    const imageWrapper = (nonCurrentName.parent as any)?.children?.[0];
    expect((imageWrapper as any)?.props?.style?.[1]).toBeFalsy();
  });

  it("debe usar getPokemonImage con el ID de cada etapa", async () => {
    const { getPokemonImage } = require("../../../utils/pokemon");

    await render(
      <PokemonEvolutionChain
        stages={mockStages}
        currentId={1}
        highlightColor="#78C850"
      />,
    );

    expect(getPokemonImage).toHaveBeenCalledWith(1);
    expect(getPokemonImage).toHaveBeenCalledWith(2);
    expect(getPokemonImage).toHaveBeenCalledWith(3);
  });

  it("debe usar la URI de imagen correcta para cada etapa", async () => {
    await render(
      <PokemonEvolutionChain
        stages={[{ id: 25, name: "pikachu" }]}
        currentId={25}
        highlightColor="#F5D100"
      />,
    );

    const nameText = screen.getByText("pikachu");
    const stage = (nameText.parent as any);
    const imageWrapper = stage?.children?.[0];
    const image = imageWrapper?.children?.[0];
    expect((image as any)?.props?.source?.uri).toContain("25.png");
  });

  it("debe renderizar correctamente con cadena de una sola etapa (sin evolución)", async () => {
    await render(
      <PokemonEvolutionChain
        stages={[{ id: 132, name: "ditto" }]}
        currentId={132}
        highlightColor="#CC99FF"
      />,
    );

    expect(screen.getByText("ditto")).toBeTruthy();
    expect(screen.queryByTestId("evolution-arrow")).toBeNull();
  });
});

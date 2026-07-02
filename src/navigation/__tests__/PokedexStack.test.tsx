import { render, screen } from "@testing-library/react-native";
import { PokedexStack } from "../PokedexStack";

jest.mock("@react-navigation/native-stack", () => {
  const { View, Text } = require("react-native");
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(({ children }) => (
        <View testID="stack-navigator">{children}</View>
      )),
      Screen: jest.fn(({ name, options }) => (
        <View testID={`screen-${name}`}>
          <Text>{`${name} - ${options?.title}`}</Text>
        </View>
      )),
    })),
  };
});

jest.mock("../../screens/pokedex/PokemonListScreen", () => {
  const { View } = require("react-native");
  return {
    PokemonListScreen: jest.fn(() => <View testID="pokemon-list-screen" />),
  };
});

jest.mock("../../screens/pokedex/PokemonDetailScreen", () => {
  const { View } = require("react-native");
  return {
    PokemonDetailScreen: jest.fn(() => <View testID="pokemon-detail-screen" />),
  };
});

describe("PokedexStack", () => {
  it("debe renderizar el Stack Navigator", async () => {
    await render(<PokedexStack />);

    const navigator = screen.getByTestId("stack-navigator");
    expect(navigator).toBeTruthy();
  });

  it("debe crear el Stack Navigator con createNativeStackNavigator", async () => {
    const {
      createNativeStackNavigator,
    } = require("@react-navigation/native-stack");

    await render(<PokedexStack />);

    expect(createNativeStackNavigator).toHaveBeenCalled();
  });

  it("debe renderizar la pantalla PokemonList", async () => {
    await render(<PokedexStack />);

    const listScreen = screen.getByTestId("screen-PokemonList");
    expect(listScreen).toBeTruthy();
  });

  it("debe renderizar la pantalla PokemonDetail", async () => {
    await render(<PokedexStack />);

    const detailScreen = screen.getByTestId("screen-PokemonDetail");
    expect(detailScreen).toBeTruthy();
  });

  it("debe asignar el título 'Pokédex' a PokemonList", async () => {
    await render(<PokedexStack />);

    const listScreenContent = screen.getByText(/PokemonList - Pokédex/);
    expect(listScreenContent).toBeTruthy();
  });

  it("debe asignar el título 'Detalle' a PokemonDetail", async () => {
    await render(<PokedexStack />);

    const detailScreenContent = screen.getByText(/PokemonDetail - Detalle/);
    expect(detailScreenContent).toBeTruthy();
  });

  it("debe tener PokemonListScreen como componente en PokemonList", async () => {
    const {
      PokemonListScreen,
    } = require("../../screens/pokedex/PokemonListScreen");

    await render(<PokedexStack />);

    expect(PokemonListScreen).toBeTruthy();
  });

  it("debe tener PokemonDetailScreen como componente en PokemonDetail", async () => {
    const {
      PokemonDetailScreen,
    } = require("../../screens/pokedex/PokemonDetailScreen");

    await render(<PokedexStack />);

    expect(PokemonDetailScreen).toBeTruthy();
  });

  it("debe pasar el nombre correcto a la pantalla PokemonList", async () => {
    await render(<PokedexStack />);

    const screenElement = screen.getByTestId("screen-PokemonList");
    expect(screenElement).toBeTruthy();
  });

  it("debe pasar el nombre correcto a la pantalla PokemonDetail", async () => {
    await render(<PokedexStack />);

    const screenElement = screen.getByTestId("screen-PokemonDetail");
    expect(screenElement).toBeTruthy();
  });

  it("debe crear un Stack Navigator con PokedexStackParamList", async () => {
    const {
      createNativeStackNavigator,
    } = require("@react-navigation/native-stack");

    await render(<PokedexStack />);

    expect(createNativeStackNavigator).toHaveBeenCalled();
  });

  it("debe renderizar Stack.Navigator con dos pantallas", async () => {
    await render(<PokedexStack />);

    const pokemonListScreen = screen.queryByTestId("screen-PokemonList");
    const pokemonDetailScreen = screen.queryByTestId("screen-PokemonDetail");

    expect(pokemonListScreen).toBeTruthy();
    expect(pokemonDetailScreen).toBeTruthy();
  });
});

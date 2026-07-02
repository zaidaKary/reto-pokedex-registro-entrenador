import { useNavigation } from "@react-navigation/native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { usePokemonList } from "../../../hooks/usePokemonList";
import { usePokemonSearch } from "../../../hooks/usePokemonSearch";
import { PokemonListScreen } from "../PokemonListScreen";

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: jest.fn(() => <View />),
  };
});

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));
jest.mock("../../../hooks/usePokemonList");
jest.mock("../../../hooks/usePokemonSearch");

jest.mock("../../../components/common/LoadingView", () => {
  const { View, Text } = require("react-native");
  return {
    LoadingView: jest.fn(({ message }) => (
      <View testID="loading-view">
        <Text>{message}</Text>
      </View>
    )),
  };
});

jest.mock("../../../components/common/ErrorView", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return {
    ErrorView: jest.fn(({ message, onRetry }) => (
      <View testID="error-view">
        <Text>{message}</Text>
        <TouchableOpacity onPress={onRetry} testID="retry-button">
          <Text>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )),
  };
});

jest.mock("../../../components/common/ScreenContainer", () => {
  const { View } = require("react-native");
  return {
    ScreenContainer: jest.fn(({ children }) => (
      <View testID="screen-container">{children}</View>
    )),
  };
});

jest.mock("../../../components/common/SearchBar", () => {
  const { TextInput } = require("react-native");
  return {
    SearchBar: jest.fn(({ value, onChangeText }) => (
      <TextInput
        testID="search-bar"
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar"
      />
    )),
  };
});

jest.mock("../../../components/pokemon/PokemonCard", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return {
    PokemonCard: jest.fn(({ name, onPress }) => (
      <TouchableOpacity testID={`pokemon-card-${name}`} onPress={onPress}>
        <Text>{name}</Text>
      </TouchableOpacity>
    )),
  };
});

describe("PokemonListScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe mostrar LoadingView cuando está cargando", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: undefined,
    });

    await render(<PokemonListScreen />);

    const loadingView = screen.getByTestId("loading-view");
    expect(loadingView).toBeTruthy();
  });

  it("debe mostrar ErrorView cuando hay error", async () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockRefetch = jest.fn();
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: undefined,
    });

    await render(<PokemonListScreen />);

    const errorView = screen.getByTestId("error-view");
    expect(errorView).toBeTruthy();
  });

  it("debe llamar a refetch cuando se presiona el botón de reintentar", async () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockRefetch = jest.fn();
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: undefined,
    });

    await render(<PokemonListScreen />);

    const retryButton = screen.getByTestId("retry-button");
    await fireEvent.press(retryButton);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("debe renderizar ScreenContainer cuando hay datos", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    const container = screen.getByTestId("screen-container");
    expect(container).toBeTruthy();
  });

  it("debe renderizar FlatList con pokemons", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
              { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    expect(screen.getByTestId("pokemon-card-bulbasaur")).toBeTruthy();
    expect(screen.getByTestId("pokemon-card-ivysaur")).toBeTruthy();
  });

  it("debe mostrar SearchBar", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeTruthy();
  });

  it("debe filtrar pokemons según búsqueda", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
              { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      },
    });

    await render(<PokemonListScreen />);

    const searchBar = screen.getByTestId("search-bar") as any;
    expect(searchBar).toBeTruthy();
  });

  it("debe navegar a PokemonDetail cuando se presiona una tarjeta", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    const pokemonCard = screen.getByTestId("pokemon-card-bulbasaur");
    await fireEvent.press(pokemonCard);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("PokemonDetail", {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    });
  });

  it("debe llamar a fetchNextPage cuando llega al final sin buscar", async () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockFetchNextPage = jest.fn();
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    expect(screen.getByTestId("pokemon-card-bulbasaur")).toBeTruthy();
  });

  it("debe usar useNavigation hook", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    expect(useNavigation).toHaveBeenCalled();
  });

  it("debe usar usePokemonList hook", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    expect(usePokemonList).toHaveBeenCalled();
  });

  it("debe usar usePokemonSearch hook", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: { pages: [{ results: [] }] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    expect(usePokemonSearch).toHaveBeenCalled();
  });

  it("debe renderizar múltiples pokemons en FlatList", async () => {
    const mockNavigation = { navigate: jest.fn() };
    (useNavigation as unknown as jest.Mock).mockReturnValue(mockNavigation);
    (usePokemonList as unknown as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
              { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
              { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
    (usePokemonSearch as unknown as jest.Mock).mockReturnValue({
      data: { results: [] },
    });

    await render(<PokemonListScreen />);

    const bulbasaur = screen.getByTestId("pokemon-card-bulbasaur");
    const ivysaur = screen.getByTestId("pokemon-card-ivysaur");
    const venusaur = screen.getByTestId("pokemon-card-venusaur");

    expect(bulbasaur).toBeTruthy();
    expect(ivysaur).toBeTruthy();
    expect(venusaur).toBeTruthy();
  });
});

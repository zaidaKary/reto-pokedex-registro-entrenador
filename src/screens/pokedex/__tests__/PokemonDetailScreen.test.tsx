import * as ReactNavigation from "@react-navigation/native";
import { render } from "@testing-library/react-native";

import { ErrorView } from "../../../components/common/ErrorView";
import { PokemonEvolutionChain } from "../../../components/pokemon/PokemonEvolutionChain";
import { PokemonHeader } from "../../../components/pokemon/PokemonHeader";
import { PokemonStatBar } from "../../../components/pokemon/PokemonStatBar";
import { PokemonTypeBadge } from "../../../components/pokemon/PokemonTypeBadge";
import { ShimmerLoader } from "../../../components/pokemon/ShimmerLoader";
import { usePokemonDetail } from "../../../hooks/usePokemonDetail";
import { usePokemonEvolutionChain } from "../../../hooks/usePokemonEvolutionChain";
import { usePokemonSpecies } from "../../../hooks/usePokemonSpecies";
import { PokemonDetailScreen } from "../PokemonDetailScreen";

jest.mock("@react-navigation/native");
jest.mock("../../../hooks/usePokemonDetail");
jest.mock("../../../hooks/usePokemonSpecies");
jest.mock("../../../hooks/usePokemonEvolutionChain");
jest.mock("../../../components/pokemon/ShimmerLoader");
jest.mock("../../../components/pokemon/PokemonEvolutionChain");
jest.mock("../../../components/common/ErrorView");
jest.mock("../../../components/pokemon/PokemonHeader");
jest.mock("../../../components/pokemon/PokemonStatBar");
jest.mock("../../../components/pokemon/PokemonTypeBadge");

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: jest.fn(() => <View />),
  };
});

const mockRefetch = jest.fn();

const mockPokemonData = {
  id: 1,
  name: "bulbasaur",
  weight: 69,
  height: 7,
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: { name: "grass" },
    },
    {
      slot: 2,
      type: { name: "poison" },
    },
  ],
  stats: [
    {
      stat: { name: "hp" },
      base_stat: 45,
    },
    {
      stat: { name: "attack" },
      base_stat: 49,
    },
  ],
};

describe("PokemonDetailScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (ReactNavigation.useRoute as unknown as jest.Mock).mockReturnValue({
      params: {
        url: "https://api.example.com/pokemon/1/",
      },
    });

    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    (ErrorView as unknown as jest.Mock).mockReturnValue(null);
    (PokemonHeader as unknown as jest.Mock).mockReturnValue(null);
    (PokemonStatBar as unknown as jest.Mock).mockReturnValue(null);
    (PokemonTypeBadge as unknown as jest.Mock).mockReturnValue(null);
    (PokemonEvolutionChain as unknown as jest.Mock).mockReturnValue(null);
    (ShimmerLoader as unknown as jest.Mock).mockReturnValue(null);
    (usePokemonSpecies as unknown as jest.Mock).mockReturnValue({
      data: { evolutionChainUrl: "https://api.example.com/evolution-chain/1/" },
    });
    (usePokemonEvolutionChain as unknown as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ],
    });
  });

  it("should render ShimmerLoader when isLoading is true", async () => {
    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      refetch: mockRefetch,
    });

    await render(<PokemonDetailScreen />);

    expect(ShimmerLoader).toHaveBeenCalled();
  });

  it("should render ErrorView when isError is true", async () => {
    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });
    (usePokemonSpecies as unknown as jest.Mock).mockReturnValue({
      data: { evolutionChainUrl: "https://api.example.com/evolution-chain/1/" },
    });
    (usePokemonEvolutionChain as unknown as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ],
    });

    await render(<PokemonDetailScreen />);

    expect(ErrorView).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "No fue posible obtener el Pokémon.",
        onRetry: mockRefetch,
      }),
      undefined
    );
  });

  it("should render ErrorView when data is undefined", async () => {
    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });
    (usePokemonSpecies as unknown as jest.Mock).mockReturnValue({
      data: { evolutionChainUrl: "https://api.example.com/evolution-chain/1/" },
    });
    (usePokemonEvolutionChain as unknown as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ],
    });

    await render(<PokemonDetailScreen />);

    expect(ErrorView).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "No fue posible obtener el Pokémon.",
        onRetry: mockRefetch,
      }),
      undefined
    );
  });

  it("should call refetch when onRetry is pressed in ErrorView", async () => {
    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });
    (usePokemonSpecies as unknown as jest.Mock).mockReturnValue({
      data: { evolutionChainUrl: "https://api.example.com/evolution-chain/1/" },
    });
    (usePokemonEvolutionChain as unknown as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ],
    });

    const errorViewMock = jest.fn(({ onRetry }) => {
      onRetry();
      return null;
    });

    (ErrorView as unknown as jest.Mock).mockImplementation(errorViewMock);

    await render(<PokemonDetailScreen />);

    expect(mockRefetch).toHaveBeenCalled();
  });

  it("should call usePokemonDetail with correct URL from route params", async () => {
    const testUrl = "https://api.example.com/pokemon/25/";

    (ReactNavigation.useRoute as unknown as jest.Mock).mockReturnValue({
      params: {
        url: testUrl,
      },
    });

    await render(<PokemonDetailScreen />);

    expect(usePokemonDetail).toHaveBeenCalledWith(testUrl);
  });

  it("should call usePokemonSpecies and usePokemonEvolutionChain with derived ids", async () => {
    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });
    (usePokemonSpecies as unknown as jest.Mock).mockReturnValue({
      data: {
        evolutionChainUrl: "https://api.example.com/evolution-chain/42/",
      },
    });
    (usePokemonEvolutionChain as unknown as jest.Mock).mockReturnValue({
      data: [
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ],
    });

    await render(<PokemonDetailScreen />);

    expect(usePokemonSpecies).toHaveBeenCalledWith(1);
    expect(usePokemonEvolutionChain).toHaveBeenCalledWith(
      "https://api.example.com/evolution-chain/42/"
    );
  });

  it("should render PokemonHeader with correct props", async () => {
    await render(<PokemonDetailScreen />);

    expect(PokemonHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockPokemonData.id,
        name: mockPokemonData.name,
        image: mockPokemonData.sprites.other["official-artwork"].front_default,
      }),
      undefined
    );
  });

  it("should render PokemonTypeBadge for each type", async () => {
    await render(<PokemonDetailScreen />);

    expect(PokemonTypeBadge).toHaveBeenCalledTimes(2);
    expect(PokemonTypeBadge).toHaveBeenCalledWith(
      expect.objectContaining({ type: "grass" }),
      undefined
    );
    expect(PokemonTypeBadge).toHaveBeenCalledWith(
      expect.objectContaining({ type: "poison" }),
      undefined
    );
  });

  it("should render PokemonStatBar for each stat", async () => {
    await render(<PokemonDetailScreen />);

    expect(PokemonStatBar).toHaveBeenCalledTimes(2);
    expect(PokemonStatBar).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "hp",
        value: 45,
      }),
      undefined
    );
    expect(PokemonStatBar).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "attack",
        value: 49,
      }),
      undefined
    );
  });

  it("should handle pokemon with single type", async () => {
    const singleTypeData = {
      ...mockPokemonData,
      types: [
        {
          slot: 1,
          type: { name: "fire" },
        },
      ],
    };

    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: singleTypeData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    jest.clearAllMocks();
    (PokemonTypeBadge as unknown as jest.Mock).mockReturnValue(null);

    await render(<PokemonDetailScreen />);

    expect(PokemonTypeBadge).toHaveBeenCalledTimes(1);
    expect(PokemonTypeBadge).toHaveBeenCalledWith(
      expect.objectContaining({ type: "fire" }),
      undefined
    );
  });

  it("should handle pokemon with many stats", async () => {
    const manyStatsData = {
      ...mockPokemonData,
      stats: [
        { stat: { name: "hp" }, base_stat: 45 },
        { stat: { name: "attack" }, base_stat: 49 },
        { stat: { name: "defense" }, base_stat: 49 },
        { stat: { name: "sp-attack" }, base_stat: 65 },
        { stat: { name: "sp-defense" }, base_stat: 65 },
        { stat: { name: "speed" }, base_stat: 45 },
      ],
    };

    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: manyStatsData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    jest.clearAllMocks();
    (PokemonStatBar as unknown as jest.Mock).mockReturnValue(null);

    await render(<PokemonDetailScreen />);

    expect(PokemonStatBar).toHaveBeenCalledTimes(6);
  });

  it("should use primary type for gradient color calculation", async () => {
    const testData = {
      ...mockPokemonData,
      types: [
        { slot: 1, type: { name: "water" } },
        { slot: 2, type: { name: "flying" } },
      ],
    };

    (usePokemonDetail as unknown as jest.Mock).mockReturnValue({
      data: testData,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    await render(<PokemonDetailScreen />);

    expect(PokemonTypeBadge).toHaveBeenCalledWith(
      expect.objectContaining({ type: "water" }),
      undefined
    );
  });
});

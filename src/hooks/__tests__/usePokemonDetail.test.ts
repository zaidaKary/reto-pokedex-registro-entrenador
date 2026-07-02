import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "../../api/pokemon";
import { PokemonDetail } from "../../types/pokemon";
import { usePokemonDetail } from "../usePokemonDetail";

jest.mock("@tanstack/react-query");
jest.mock("../../api/pokemon");

describe("usePokemonDetail", () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
  const mockGetPokemonDetail = getPokemonDetail as jest.MockedFunction<
    typeof getPokemonDetail
  >;

  const mockPokemonData: PokemonDetail = {
    id: 1,
    name: "bulbasaur",
    types: [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/",
        },
      },
    ],
    stats: [],
    sprites: {
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as any);
  });

  it("debe llamar a useQuery con la configuración correcta", () => {
    const testUrl = "https://pokeapi.co/api/v2/pokemon/1/";

    usePokemonDetail(testUrl);

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["pokemon-detail", testUrl],
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it("debe llamar a getPokemonDetail con la URL correcta", async () => {
    const testUrl = "https://pokeapi.co/api/v2/pokemon/1/";
    mockGetPokemonDetail.mockResolvedValue(mockPokemonData);

    usePokemonDetail(testUrl);

    const call = mockUseQuery.mock.calls[0][0];
    await (call.queryFn as Function)();

    expect(mockGetPokemonDetail).toHaveBeenCalledWith(testUrl);
  });

  it("debe deshabilitar la query cuando la URL está vacía", () => {
    usePokemonDetail("");

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
      }),
    );
  });

  it("debe habilitar la query cuando la URL está disponible", () => {
    const testUrl = "https://pokeapi.co/api/v2/pokemon/25/";

    usePokemonDetail(testUrl);

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
      }),
    );
  });

  it("debe retornar los datos del useQuery", () => {
    const testUrl = "https://pokeapi.co/api/v2/pokemon/1/";

    const result = usePokemonDetail(testUrl);

    expect(result.data).toEqual(mockPokemonData);
    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
  });

  it("debe manejar errores de getPokemonDetail", async () => {
    const testUrl = "https://pokeapi.co/api/v2/pokemon/invalid/";
    const errorMessage = "No se pudo obtener el Pokémon";

    mockGetPokemonDetail.mockRejectedValue(new Error(errorMessage));

    usePokemonDetail(testUrl);

    const call = mockUseQuery.mock.calls[0][0];

    await expect((call.queryFn as Function)()).rejects.toThrow(errorMessage);
  });

  it("debe actualizar la queryKey cuando la URL cambia", () => {
    const url1 = "https://pokeapi.co/api/v2/pokemon/1/";
    const url2 = "https://pokeapi.co/api/v2/pokemon/2/";

    usePokemonDetail(url1);
    const firstCall = mockUseQuery.mock.calls[0][0];

    usePokemonDetail(url2);
    const secondCall = mockUseQuery.mock.calls[1][0];

    expect(firstCall.queryKey).toEqual(["pokemon-detail", url1]);
    expect(secondCall.queryKey).toEqual(["pokemon-detail", url2]);
  });
});

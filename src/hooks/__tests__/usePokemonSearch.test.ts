import { useQuery } from "@tanstack/react-query";
import { getPokemonSearchList } from "../../api/pokemon";
import { PokemonListResponse } from "../../types/pokemon";
import { usePokemonSearch } from "../usePokemonSearch";

jest.mock("@tanstack/react-query");
jest.mock("../../api/pokemon");

describe("usePokemonSearch", () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
  const mockGetPokemonSearchList = getPokemonSearchList as jest.MockedFunction<
    typeof getPokemonSearchList
  >;

  const mockPokemonSearchResponse: PokemonListResponse = {
    count: 1025,
    next: null,
    previous: null,
    results: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      },
      {
        name: "venusaur",
        url: "https://pokeapi.co/api/v2/pokemon/3/",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: mockPokemonSearchResponse,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as any);
  });

  it("debe llamar a useQuery con la configuración correcta", () => {
    usePokemonSearch();

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["pokemon-search"],
      queryFn: mockGetPokemonSearchList,
      staleTime: Infinity,
    });
  });

  it("debe llamar a getPokemonSearchList sin parámetros", async () => {
    mockGetPokemonSearchList.mockResolvedValue(mockPokemonSearchResponse);

    usePokemonSearch();

    const call = mockUseQuery.mock.calls[0][0];
    await (call.queryFn as Function)();

    expect(mockGetPokemonSearchList).toHaveBeenCalledWith();
  });

  it("debe configurar staleTime en Infinity para cachear los datos indefinidamente", () => {
    usePokemonSearch();

    const call = mockUseQuery.mock.calls[0][0];

    expect(call.staleTime).toBe(Infinity);
  });

  it("debe usar queryKey 'pokemon-search'", () => {
    usePokemonSearch();

    const call = mockUseQuery.mock.calls[0][0];

    expect(call.queryKey).toEqual(["pokemon-search"]);
  });

  it("debe retornar los datos de la query", () => {
    const result = usePokemonSearch();

    expect(result.data).toEqual(mockPokemonSearchResponse);
    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
    expect(result.status).toBe("success");
  });

  it("debe manejar errores de getPokemonSearchList", async () => {
    const errorMessage = "Error obteniendo los Pokémon";
    mockGetPokemonSearchList.mockRejectedValue(new Error(errorMessage));

    usePokemonSearch();

    const call = mockUseQuery.mock.calls[0][0];

    await expect((call.queryFn as Function)()).rejects.toThrow(errorMessage);
  });

  it("debe retornar la lista completa de Pokémon", () => {
    const result = usePokemonSearch();
    const data = result.data as PokemonListResponse;

    expect(data.results).toHaveLength(3);
    expect(data.results[0].name).toBe("bulbasaur");
    expect(data.results[1].name).toBe("ivysaur");
    expect(data.results[2].name).toBe("venusaur");
  });

  it("debe indicar que no hay más páginas", () => {
    const result = usePokemonSearch();
    const data = result.data as PokemonListResponse;

    expect(data.next).toBeNull();
    expect(data.previous).toBeNull();
  });

  it("debe indicar el contador total de Pokémon", () => {
    const result = usePokemonSearch();
    const data = result.data as PokemonListResponse;

    expect(data.count).toBe(1025);
  });

  it("debe mantener la configuración de staleTime en todas las llamadas", () => {
    usePokemonSearch();
    jest.clearAllMocks();
    usePokemonSearch();

    expect(mockUseQuery).toHaveBeenLastCalledWith({
      queryKey: ["pokemon-search"],
      queryFn: mockGetPokemonSearchList,
      staleTime: Infinity,
    });
  });
});

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPokemonList } from "../../api/pokemon";
import { PokemonListResponse } from "../../types/pokemon";
import { usePokemonList } from "../usePokemonList";

jest.mock("@tanstack/react-query");
jest.mock("../../api/pokemon");

describe("usePokemonList", () => {
  const mockUseInfiniteQuery = useInfiniteQuery as jest.MockedFunction<
    typeof useInfiniteQuery
  >;
  const mockGetPokemonList = getPokemonList as jest.MockedFunction<
    typeof getPokemonList
  >;

  const mockPokemonListResponse: PokemonListResponse = {
    count: 1025,
    next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
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
    ],
  };

  const mockLastPageResponse: PokemonListResponse = {
    count: 1025,
    next: null,
    previous: "https://pokeapi.co/api/v2/pokemon?offset=980&limit=20",
    results: [
      {
        name: "victini",
        url: "https://pokeapi.co/api/v2/pokemon/1025/",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInfiniteQuery.mockReturnValue({
      data: {
        pages: [mockPokemonListResponse],
        pageParams: [0],
      },
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
    } as any);
  });

  it("debe llamar a useInfiniteQuery con la configuración correcta", () => {
    usePokemonList();

    expect(mockUseInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["pokemon-list"],
        initialPageParam: 0,
        queryFn: expect.any(Function),
        getNextPageParam: expect.any(Function),
      }),
    );
  });

  it("debe llamar a getPokemonList con el offset inicial y limit", async () => {
    mockGetPokemonList.mockResolvedValue(mockPokemonListResponse);

    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    await (call.queryFn as Function)({ pageParam: 0 });

    expect(mockGetPokemonList).toHaveBeenCalledWith(0, 20);
  });

  it("debe llamar a getPokemonList con el offset correcto en páginas siguientes", async () => {
    mockGetPokemonList.mockResolvedValue(mockPokemonListResponse);

    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    await (call.queryFn as Function)({ pageParam: 20 });

    expect(mockGetPokemonList).toHaveBeenCalledWith(20, 20);
  });

  it("debe retornar el siguiente offset cuando hay más páginas", () => {
    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    const nextOffset = (call.getNextPageParam as Function)(
      mockPokemonListResponse,
    );

    expect(nextOffset).toBe(20);
  });

  it("debe retornar undefined cuando no hay más páginas", () => {
    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    const nextOffset = (call.getNextPageParam as Function)(
      mockLastPageResponse,
    );

    expect(nextOffset).toBeUndefined();
  });

  it("debe extraer el offset correcto de la URL next", () => {
    const responseWithCustomOffset: PokemonListResponse = {
      count: 1025,
      next: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",
      previous: null,
      results: [],
    };

    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    const nextOffset = (call.getNextPageParam as Function)(
      responseWithCustomOffset,
    );

    expect(nextOffset).toBe(40);
  });

  it("debe manejar múltiples parámetros en la URL next", () => {
    const responseWithQueryParams: PokemonListResponse = {
      count: 1025,
      next: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=60&filter=type",
      previous: null,
      results: [],
    };

    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];
    const nextOffset = (call.getNextPageParam as Function)(
      responseWithQueryParams,
    );

    expect(nextOffset).toBe(60);
  });

  it("debe retornar los datos de la query infinita", () => {
    const result = usePokemonList();

    expect(result.data?.pages).toEqual([mockPokemonListResponse]);
    expect(result.data?.pageParams).toEqual([0]);
    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
    expect(result.hasNextPage).toBe(true);
  });

  it("debe manejar errores de getPokemonList", async () => {
    const errorMessage = "Error obteniendo la lista de Pokémon";
    mockGetPokemonList.mockRejectedValue(new Error(errorMessage));

    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];

    await expect((call.queryFn as Function)({ pageParam: 0 })).rejects.toThrow(
      errorMessage,
    );
  });

  it("debe mantener el mismo queryKey para todas las páginas", () => {
    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];

    expect(call.queryKey).toEqual(["pokemon-list"]);
  });

  it("debe usar initialPageParam de 0", () => {
    usePokemonList();

    const call = mockUseInfiniteQuery.mock.calls[0][0];

    expect(call.initialPageParam).toBe(0);
  });
});

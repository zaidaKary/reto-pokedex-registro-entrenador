import { useQuery } from "@tanstack/react-query";
import { getPokemonEvolutionChain } from "../../api/pokemon";
import { EvolutionChain } from "../../types/pokemon";
import { usePokemonEvolutionChain } from "../usePokemonEvolutionChain";

jest.mock("@tanstack/react-query");
jest.mock("../../api/pokemon");
jest.mock("../../utils/pokemon", () => ({
  flattenChain: jest.fn((chain) => [{ name: chain.species.name, id: 1 }]),
}));

describe("usePokemonEvolutionChain", () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
  const mockGetPokemonEvolutionChain =
    getPokemonEvolutionChain as jest.MockedFunction<
      typeof getPokemonEvolutionChain
    >;

  const mockEvolutionChain: EvolutionChain = {
    chain: {
      species: {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/",
      },
      evolves_to: [
        {
          species: {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon-species/2/",
          },
          evolves_to: [
            {
              species: {
                name: "venusaur",
                url: "https://pokeapi.co/api/v2/pokemon-species/3/",
              },
              evolves_to: [],
            },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as any);
  });

  it("debe llamar a useQuery con la configuración correcta", () => {
    const url = "https://pokeapi.co/api/v2/evolution-chain/1/";

    usePokemonEvolutionChain(url);

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["evolution-chain", url],
      queryFn: expect.any(Function),
      enabled: true,
      select: expect.any(Function),
    });
  });

  it("debe llamar a getPokemonEvolutionChain con la url correcta", async () => {
    const url = "https://pokeapi.co/api/v2/evolution-chain/1/";
    mockGetPokemonEvolutionChain.mockResolvedValue(mockEvolutionChain);

    usePokemonEvolutionChain(url);

    const call = mockUseQuery.mock.calls[0][0];
    await (call.queryFn as Function)();

    expect(mockGetPokemonEvolutionChain).toHaveBeenCalledWith(url);
  });

  it("debe deshabilitar la query cuando la url está vacía", () => {
    usePokemonEvolutionChain("");

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });

  it("debe habilitar la query cuando la url es válida", () => {
    usePokemonEvolutionChain(
      "https://pokeapi.co/api/v2/evolution-chain/1/",
    );

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: true }),
    );
  });

  it("debe actualizar la queryKey cuando la url cambia", () => {
    const url1 = "https://pokeapi.co/api/v2/evolution-chain/1/";
    const url2 = "https://pokeapi.co/api/v2/evolution-chain/2/";

    usePokemonEvolutionChain(url1);
    const firstCall = mockUseQuery.mock.calls[0][0];

    usePokemonEvolutionChain(url2);
    const secondCall = mockUseQuery.mock.calls[1][0];

    expect(firstCall.queryKey).toEqual(["evolution-chain", url1]);
    expect(secondCall.queryKey).toEqual(["evolution-chain", url2]);
  });

  it("debe llamar a flattenChain con data.chain en la función select", () => {
    const { flattenChain } = require("../../utils/pokemon");

    usePokemonEvolutionChain("https://pokeapi.co/api/v2/evolution-chain/1/");

    const call = mockUseQuery.mock.calls[0][0];
    (call.select as Function)(mockEvolutionChain);

    expect(flattenChain).toHaveBeenCalledWith(mockEvolutionChain.chain);
  });

  it("debe manejar errores de getPokemonEvolutionChain", async () => {
    const url = "https://pokeapi.co/api/v2/evolution-chain/1/";
    const errorMessage = "No se pudo obtener la cadena evolutiva";
    mockGetPokemonEvolutionChain.mockRejectedValue(new Error(errorMessage));

    usePokemonEvolutionChain(url);

    const call = mockUseQuery.mock.calls[0][0];

    await expect((call.queryFn as Function)()).rejects.toThrow(errorMessage);
  });

  it("debe retornar los datos del useQuery", () => {
    const selectedData = [
      { name: "bulbasaur", id: 1 },
      { name: "ivysaur", id: 2 },
      { name: "venusaur", id: 3 },
    ];
    mockUseQuery.mockReturnValue({
      data: selectedData,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as any);

    const result = usePokemonEvolutionChain(
      "https://pokeapi.co/api/v2/evolution-chain/1/",
    );

    expect(result.data).toEqual(selectedData);
    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
  });
});

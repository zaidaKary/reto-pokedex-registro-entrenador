import { useQuery } from "@tanstack/react-query";
import { getPokemonSpecies } from "../../api/pokemon";
import { PokemonSpecies } from "../../types/pokemon";
import { usePokemonSpecies } from "../usePokemonSpecies";

jest.mock("@tanstack/react-query");
jest.mock("../../api/pokemon");

describe("usePokemonSpecies", () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
  const mockGetPokemonSpecies = getPokemonSpecies as jest.MockedFunction<
    typeof getPokemonSpecies
  >;

  const mockSpeciesData: PokemonSpecies = {
    evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
    flavor_text_entries: [
      {
        flavor_text: "A strange\nseed was\fplanted.",
        language: { name: "en" },
        version: { name: "red" },
      },
      {
        flavor_text: "Una semilla extraña fue plantada.",
        language: { name: "es" },
        version: { name: "red" },
      },
    ],
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
    usePokemonSpecies(1);

    expect(mockUseQuery).toHaveBeenCalledWith({
      queryKey: ["pokemon-species", 1],
      queryFn: expect.any(Function),
      enabled: true,
      select: expect.any(Function),
    });
  });

  it("debe llamar a getPokemonSpecies con el id correcto", async () => {
    mockGetPokemonSpecies.mockResolvedValue(mockSpeciesData);

    usePokemonSpecies(25);

    const call = mockUseQuery.mock.calls[0][0];
    await (call.queryFn as Function)();

    expect(mockGetPokemonSpecies).toHaveBeenCalledWith(25);
  });

  it("debe deshabilitar la query cuando el id es 0", () => {
    usePokemonSpecies(0);

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false }),
    );
  });

  it("debe habilitar la query cuando el id es válido", () => {
    usePokemonSpecies(1);

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: true }),
    );
  });

  it("debe actualizar la queryKey cuando el id cambia", () => {
    usePokemonSpecies(1);
    const firstCall = mockUseQuery.mock.calls[0][0];

    usePokemonSpecies(25);
    const secondCall = mockUseQuery.mock.calls[1][0];

    expect(firstCall.queryKey).toEqual(["pokemon-species", 1]);
    expect(secondCall.queryKey).toEqual(["pokemon-species", 25]);
  });

  describe("select - transformación de datos", () => {
    let selectFn: (data: PokemonSpecies) => { description: string; evolutionChainUrl: string };

    beforeEach(() => {
      usePokemonSpecies(1);
      const call = mockUseQuery.mock.calls[0][0];
      selectFn = call.select as typeof selectFn;
    });

    it("debe extraer la descripción en inglés y reemplazar saltos de línea y form-feeds", () => {
      const result = selectFn(mockSpeciesData);

      expect(result.description).toBe("A strange seed was planted.");
    });

    it("debe retornar descripción vacía cuando no hay entrada en inglés", () => {
      const dataWithoutEn: PokemonSpecies = {
        ...mockSpeciesData,
        flavor_text_entries: [
          {
            flavor_text: "Una semilla extraña.",
            language: { name: "es" },
            version: { name: "red" },
          },
        ],
      };

      const result = selectFn(dataWithoutEn);

      expect(result.description).toBe("");
    });

    it("debe retornar la URL de la cadena evolutiva correctamente", () => {
      const result = selectFn(mockSpeciesData);

      expect(result.evolutionChainUrl).toBe(
        "https://pokeapi.co/api/v2/evolution-chain/1/",
      );
    });

    it("debe reemplazar \\f por espacio", () => {
      const dataWithFormFeed: PokemonSpecies = {
        ...mockSpeciesData,
        flavor_text_entries: [
          {
            flavor_text: "Texto\fcon form-feed.",
            language: { name: "en" },
            version: { name: "red" },
          },
        ],
      };

      const result = selectFn(dataWithFormFeed);

      expect(result.description).toBe("Texto con form-feed.");
    });

    it("debe reemplazar \\n por espacio", () => {
      const dataWithNewline: PokemonSpecies = {
        ...mockSpeciesData,
        flavor_text_entries: [
          {
            flavor_text: "Texto\ncon salto.",
            language: { name: "en" },
            version: { name: "red" },
          },
        ],
      };

      const result = selectFn(dataWithNewline);

      expect(result.description).toBe("Texto con salto.");
    });
  });

  it("debe manejar errores de getPokemonSpecies", async () => {
    const errorMessage = "No se pudo obtener la descripción del Pokémon";
    mockGetPokemonSpecies.mockRejectedValue(new Error(errorMessage));

    usePokemonSpecies(1);

    const call = mockUseQuery.mock.calls[0][0];

    await expect((call.queryFn as Function)()).rejects.toThrow(errorMessage);
  });

  it("debe retornar los datos del useQuery", () => {
    const selectedData = {
      description: "A strange seed was planted.",
      evolutionChainUrl: "https://pokeapi.co/api/v2/evolution-chain/1/",
    };
    mockUseQuery.mockReturnValue({
      data: selectedData,
      isLoading: false,
      isError: false,
      error: null,
      status: "success",
    } as any);

    const result = usePokemonSpecies(1);

    expect(result.data).toEqual(selectedData);
    expect(result.isLoading).toBe(false);
    expect(result.isError).toBe(false);
  });
});

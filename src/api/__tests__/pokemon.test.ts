import {
  EvolutionChain,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpecies,
} from "../../types/pokemon";
import {
  getPokemonDetail,
  getPokemonEvolutionChain,
  getPokemonList,
  getPokemonSearchList,
  getPokemonSpecies,
} from "../pokemon";

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
globalThis.fetch = mockFetch;

describe("Pokemon API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.POKEAPI_BASE_URL;
  });

  describe("getPokemonList", () => {
    it("debe obtener la lista de pokémon con valores por defecto", async () => {
      const mockResponse: PokemonListResponse = {
        count: 1025,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getPokemonList();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
      );
      expect(result).toEqual(mockResponse);
    });

    it("debe obtener la lista de pokémon con offset y limit personalizados", async () => {
      const mockResponse: PokemonListResponse = {
        count: 1025,
        next: null,
        previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
        results: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getPokemonList(50, 30);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?offset=50&limit=30",
      );
      expect(result).toEqual(mockResponse);
    });

    it("debe usar BASE_URL de environment variable si está disponible", async () => {
      process.env.POKEAPI_BASE_URL = "https://custom-api.com";

      const mockResponse: PokemonListResponse = {
        count: 1025,
        next: null,
        previous: null,
        results: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await getPokemonList();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
      );
    });

    it("debe lanzar error cuando la respuesta no es ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getPokemonList()).rejects.toThrow(
        "Error obteniendo la lista de Pokémon",
      );
    });

    it("debe lanzar error cuando fetch falla", async () => {
      const error = new Error("Network error");
      mockFetch.mockRejectedValueOnce(error);

      await expect(getPokemonList()).rejects.toThrow("Network error");
    });
  });

  describe("getPokemonDetail", () => {
    it("debe obtener el detalle de un pokémon", async () => {
      const mockDetail: PokemonDetail = {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
        base_experience: 64,
        sprites: {
          front_default: "https://raw.githubusercontent.com/...",
          other: {
            "official-artwork": {
              front_default: "https://raw.githubusercontent.com/...",
            },
          },
        },
        types: [{ type: { name: "grass" } }],
        stats: [{ base_stat: 45, stat: { name: "hp" } }],
      } as unknown as PokemonDetail;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockDetail,
      } as Response);

      const url = "https://pokeapi.co/api/v2/pokemon/1/";
      const result = await getPokemonDetail(url);

      expect(mockFetch).toHaveBeenCalledWith(url);
      expect(result).toEqual(mockDetail);
    });

    it("debe lanzar error cuando la respuesta no es ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(
        getPokemonDetail("https://pokeapi.co/api/v2/pokemon/999/"),
      ).rejects.toThrow("No se pudo obtener el detalle del Pokémon");
    });

    it("debe lanzar error cuando fetch falla", async () => {
      const error = new Error("Network error");
      mockFetch.mockRejectedValueOnce(error);

      await expect(
        getPokemonDetail("https://pokeapi.co/api/v2/pokemon/1/"),
      ).rejects.toThrow("Network error");
    });
  });

  describe("getPokemonSearchList", () => {
    it("debe obtener la lista completa de pokémon para búsqueda", async () => {
      const mockResponse: PokemonListResponse = {
        count: 1025,
        next: null,
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getPokemonSearchList();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=20000",
      );
      expect(result).toEqual(mockResponse);
    });

    it("debe usar BASE_URL de environment variable si está disponible", async () => {
      process.env.POKEAPI_BASE_URL = "https://custom-api.com";

      const mockResponse: PokemonListResponse = {
        count: 1025,
        next: null,
        previous: null,
        results: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await getPokemonSearchList();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon?limit=20000",
      );
    });

    it("debe lanzar error cuando la respuesta no es ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getPokemonSearchList()).rejects.toThrow(
        "Error obteniendo los Pokémon",
      );
    });

    it("debe lanzar error cuando fetch falla", async () => {
      const error = new Error("Network error");
      mockFetch.mockRejectedValueOnce(error);

      await expect(getPokemonSearchList()).rejects.toThrow("Network error");
    });
  });

  describe("getPokemonSpecies", () => {
    it("debe obtener la especie de un pokémon", async () => {
      const mockSpecies: PokemonSpecies = {
        evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1/" },
        flavor_text_entries: [
          {
            flavor_text: "A strange seed was planted on its back at birth.",
            language: { name: "en" },
            version: { name: "red" },
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpecies,
      } as Response);

      const result = await getPokemonSpecies(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon-species/1",
      );
      expect(result).toEqual(mockSpecies);
    });

    it("debe usar BASE_URL de environment variable si está disponible", async () => {
      process.env.POKEAPI_BASE_URL = "https://custom-api.com";

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({} as PokemonSpecies),
      } as Response);

      await getPokemonSpecies(25);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://pokeapi.co/api/v2/pokemon-species/25",
      );
    });

    it("debe lanzar error cuando la respuesta no es ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getPokemonSpecies(1)).rejects.toThrow(
        "No se pudo obtener la descripción del Pokémon",
      );
    });

    it("debe lanzar error cuando fetch falla", async () => {
      const error = new Error("Network error");
      mockFetch.mockRejectedValueOnce(error);

      await expect(getPokemonSpecies(1)).rejects.toThrow("Network error");
    });
  });

  describe("getPokemonEvolutionChain", () => {
    it("debe obtener la cadena evolutiva", async () => {
      const mockChain: EvolutionChain = {
        chain: {
          species: { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
          evolves_to: [
            {
              species: { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon-species/2/" },
              evolves_to: [
                {
                  species: { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon-species/3/" },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockChain,
      } as Response);

      const url = "https://pokeapi.co/api/v2/evolution-chain/1/";
      const result = await getPokemonEvolutionChain(url);

      expect(mockFetch).toHaveBeenCalledWith(url);
      expect(result).toEqual(mockChain);
    });

    it("debe lanzar error cuando la respuesta no es ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(
        getPokemonEvolutionChain("https://pokeapi.co/api/v2/evolution-chain/1/"),
      ).rejects.toThrow("No se pudo obtener la cadena evolutiva del Pokémon");
    });

    it("debe lanzar error cuando fetch falla", async () => {
      const error = new Error("Network error");
      mockFetch.mockRejectedValueOnce(error);

      await expect(
        getPokemonEvolutionChain("https://pokeapi.co/api/v2/evolution-chain/1/"),
      ).rejects.toThrow("Network error");
    });
  });
});

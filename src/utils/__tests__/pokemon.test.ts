import { flattenChain, getPokemonId, getPokemonImage } from "../pokemon";

describe("Pokemon Utils", () => {
  describe("getPokemonId", () => {
    it("debe extraer el ID correctamente de una URL válida", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/25/";
      const id = getPokemonId(url);
      expect(id).toBe(25);
    });

    it("debe manejar URLs sin barra final", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/1";
      const id = getPokemonId(url);
      expect(id).toBe(1);
    });

    it("debe manejar IDs grandes correctamente", () => {
      const url = "https://pokeapi.co/api/v2/pokemon/1025/";
      const id = getPokemonId(url);
      expect(id).toBe(1025);
    });
  });

  describe("getPokemonImage", () => {
    it("debe generar URL correcta para imagen oficial", () => {
      const id = 25;
      const imageUrl = getPokemonImage(id);

      expect(imageUrl).toContain("25.png");
      expect(imageUrl).toContain("official-artwork");
      expect(imageUrl).toContain("raw.githubusercontent.com");
    });

    it("debe generar URL con padding de ceros para IDs pequeños", () => {
      const id = 1;
      const imageUrl = getPokemonImage(id);

      expect(imageUrl).toContain("1.png");
    });

  });

  describe("flattenChain", () => {
    it("debe retornar un solo elemento cuando no hay evoluciones", () => {
      const link = {
        species: { name: "ditto", url: "https://pokeapi.co/api/v2/pokemon-species/132/" },
        evolves_to: [],
      };

      const result = flattenChain(link);

      expect(result).toEqual([{ name: "ditto", id: 132 }]);
    });

    it("debe aplanar una cadena de dos etapas", () => {
      const link = {
        species: { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon-species/4/" },
        evolves_to: [
          {
            species: { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon-species/5/" },
            evolves_to: [],
          },
        ],
      };

      const result = flattenChain(link);

      expect(result).toEqual([
        { name: "charmander", id: 4 },
        { name: "charmeleon", id: 5 },
      ]);
    });

    it("debe aplanar una cadena de tres etapas", () => {
      const link = {
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
      };

      const result = flattenChain(link);

      expect(result).toEqual([
        { name: "bulbasaur", id: 1 },
        { name: "ivysaur", id: 2 },
        { name: "venusaur", id: 3 },
      ]);
    });

    it("debe tomar solo la primera rama cuando hay múltiples evoluciones", () => {
      const link = {
        species: { name: "eevee", url: "https://pokeapi.co/api/v2/pokemon-species/133/" },
        evolves_to: [
          {
            species: { name: "vaporeon", url: "https://pokeapi.co/api/v2/pokemon-species/134/" },
            evolves_to: [],
          },
          {
            species: { name: "jolteon", url: "https://pokeapi.co/api/v2/pokemon-species/135/" },
            evolves_to: [],
          },
        ],
      };

      const result = flattenChain(link);

      expect(result).toEqual([
        { name: "eevee", id: 133 },
        { name: "vaporeon", id: 134 },
      ]);
    });

    it("debe extraer el id correctamente de la URL de cada especie", () => {
      const link = {
        species: { name: "pichu", url: "https://pokeapi.co/api/v2/pokemon-species/172/" },
        evolves_to: [
          {
            species: { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon-species/25/" },
            evolves_to: [],
          },
        ],
      };

      const result = flattenChain(link);

      expect(result[0].id).toBe(172);
      expect(result[1].id).toBe(25);
    });
  });
});

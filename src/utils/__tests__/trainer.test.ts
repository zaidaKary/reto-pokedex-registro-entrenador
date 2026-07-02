import { mapFavoriteType } from "../trainer";
describe("Trainer Utils", () => {
  describe("mapFavoriteType", () => {
    it('debe convertir "Fuego" al tipo correcto', () => {
      const result = mapFavoriteType("Fuego");
      expect(result).toBe("fire");
    });

    it('debe convertir "Agua" al tipo correcto', () => {
      const result = mapFavoriteType("Agua");
      expect(result).toBe("water");
    });

    it('debe convertir "Planta" al tipo correcto', () => {
      const result = mapFavoriteType("Planta");
      expect(result).toBe("grass");
    });

    it("debe manejar tipos desconocidos", () => {
      const result = mapFavoriteType("Desconocido");
      expect(result).toBeDefined();
    });
  });
});

import { trainerSchema } from "../../schemas/trainer.schema";

describe("Trainer Schema Validation", () => {
  const validTrainerData = {
    fullName: "Ash Ketchum",
    age: 15,
    email: "ash@pokemon.com",
    district: "Kanto",
    favoriteType: "Fuego",
  };

  describe("Validación de fullName", () => {
    it("debe aceptar un nombre válido", async () => {
      const data = { ...validTrainerData, fullName: "Juan Pérez" };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar nombre vacío", async () => {
      const data = { ...validTrainerData, fullName: "" };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });

    it("debe rechazar nombre muy corto", async () => {
      const data = { ...validTrainerData, fullName: "Jo" };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });

    it("debe rechazar nombres con números", async () => {
      const data = { ...validTrainerData, fullName: "Ash123" };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });

    it("debe aceptar nombres con tildes", async () => {
      const data = { ...validTrainerData, fullName: "José María Ñandú" };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });
  });

  describe("Validación de age", () => {
    it("debe aceptar edad válida (mayor de 10)", async () => {
      const data = { ...validTrainerData, age: 15 };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar edad menor o igual a 10", async () => {
      const data = { ...validTrainerData, age: 10 };
      await expect(trainerSchema.validate(data)).rejects.toThrow(
        "Debe ser mayor de 10 años",
      );
    });

    it("debe rechazar edad 9", async () => {
      const data = { ...validTrainerData, age: 9 };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });

    it("debe aceptar edad 11 (mínimo válido)", async () => {
      const data = { ...validTrainerData, age: 11 };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar edad no numérica", async () => {
      const data = { ...validTrainerData, age: "abc" as any };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });
  });

  describe("Validación de email", () => {
    it("debe aceptar email válido", async () => {
      const data = { ...validTrainerData, email: "test@example.com" };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar email sin @", async () => {
      const data = { ...validTrainerData, email: "testexample.com" };
      await expect(trainerSchema.validate(data)).rejects.toThrow(
        "Correo inválido",
      );
    });

    it("debe rechazar email vacío", async () => {
      const data = { ...validTrainerData, email: "" };
      await expect(trainerSchema.validate(data)).rejects.toThrow();
    });

    it("debe aceptar email con varios dominios", async () => {
      const data = {
        ...validTrainerData,
        email: "trainer.pokemon@pokeapi.co.uk",
      };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });
  });

  describe("Validación de district", () => {
    it("debe aceptar distrito válido", async () => {
      const data = { ...validTrainerData, district: "Kanto" };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar distrito vacío", async () => {
      const data = { ...validTrainerData, district: "" };
      await expect(trainerSchema.validate(data)).rejects.toThrow(
        "El distrito es obligatorio",
      );
    });
  });

  describe("Validación de favoriteType", () => {
    it("debe aceptar tipo válido", async () => {
      const data = { ...validTrainerData, favoriteType: "Agua" };
      await expect(trainerSchema.validate(data)).resolves.toBeDefined();
    });

    it("debe rechazar tipo vacío", async () => {
      const data = { ...validTrainerData, favoriteType: "" };
      await expect(trainerSchema.validate(data)).rejects.toThrow(
        "El tipo favorito es obligatorio",
      );
    });
  });

  describe("Validación completa", () => {
    it("debe aceptar datos válidos completos", async () => {
      await expect(
        trainerSchema.validate(validTrainerData),
      ).resolves.toBeDefined();
    });

    it("debe rechazar objeto vacío", async () => {
      await expect(trainerSchema.validate({})).rejects.toThrow();
    });

    it("debe rechazar si falta algún campo requerido", async () => {
      const incompleteData: Partial<typeof validTrainerData> = {
        ...validTrainerData,
      };
      delete incompleteData.email;
      await expect(trainerSchema.validate(incompleteData)).rejects.toThrow();
    });
  });
});

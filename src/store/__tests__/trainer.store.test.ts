import { useTrainerStore } from "../../store/trainer.store";
import { Trainer } from "../../types/trainer";

describe("Trainer Store", () => {
  beforeEach(() => {
    useTrainerStore.setState({ trainer: null });
  });

  it("debe inicializar con trainer null", () => {
    const { trainer } = useTrainerStore.getState();
    expect(trainer).toBeNull();
  });

  it("debe guardar un trainer correctamente", () => {
    const mockTrainer: Trainer = {
      fullName: "Ash Ketchum",
      age: 15,
      email: "ash@example.com",
      district: "Kanto",
      favoriteType: "Fuego",
    };

    const { saveTrainer } = useTrainerStore.getState();
    saveTrainer(mockTrainer);

    const { trainer } = useTrainerStore.getState();
    expect(trainer).toEqual(mockTrainer);
    expect(trainer?.fullName).toBe("Ash Ketchum");
    expect(trainer?.age).toBe(15);
  });

  it("debe limpiar el trainer con clearTrainer", () => {
    const mockTrainer: Trainer = {
      fullName: "Misty",
      age: 13,
      email: "misty@example.com",
      district: "Breña",
      favoriteType: "Agua",
    };

    const store = useTrainerStore.getState();
    store.saveTrainer(mockTrainer);

    expect(useTrainerStore.getState().trainer).not.toBeNull();

    store.clearTrainer();

    expect(useTrainerStore.getState().trainer).toBeNull();
  });

  it("debe actualizar un trainer existente", () => {
    const firstTrainer: Trainer = {
      fullName: "Ash",
      age: 15,
      email: "ash@example.com",
      district: "Kanto",
      favoriteType: "Fuego",
    };

    const secondTrainer: Trainer = {
      fullName: "Brock",
      age: 16,
      email: "brock@example.com",
      district: "Pewter",
      favoriteType: "Roca",
    };

    const { saveTrainer } = useTrainerStore.getState();

    saveTrainer(firstTrainer);
    expect(useTrainerStore.getState().trainer?.fullName).toBe("Ash");

    saveTrainer(secondTrainer);
    expect(useTrainerStore.getState().trainer?.fullName).toBe("Brock");
  });
});

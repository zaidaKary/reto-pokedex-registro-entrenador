import { fireEvent, render, screen } from "@testing-library/react-native";
import { useTrainerStore } from "../../../store/trainer.store";
import { mapFavoriteType } from "../../../utils/trainer";
import { TrainerCard } from "../TrainerCard";

jest.mock("../../../store/trainer.store");
jest.mock("../../../utils/trainer");
jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name }: any) => {
    const { Text } = require("react-native");
    return <Text>{`Icon: ${name}`}</Text>;
  },
}));
jest.mock("../../pokemon/PokemonTypeBadge", () => ({
  PokemonTypeBadge: jest.fn(({ type }) => {
    const { View, Text } = require("react-native");
    return (
      <View testID={`pokemon-type-badge-${type}`}>
        <Text>{type}</Text>
      </View>
    );
  }),
}));

describe("TrainerCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe retornar null cuando no hay trainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: null, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    expect(screen.queryByText("🪪 Tarjeta de entrenador")).toBeFalsy();
  });

  it("debe renderizar la tarjeta cuando hay trainer", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const header = screen.getByText("Tarjeta de entrenador");
    expect(header).toBeTruthy();
  });

  it("debe mostrar el nombre del trainer", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const name = screen.getByText("Juan Pérez");
    expect(name).toBeTruthy();
  });

  it("debe mostrar la primera letra del nombre en el avatar", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const avatarText = screen.getByText("J");
    expect(avatarText).toBeTruthy();
  });

  it("debe mostrar el email del trainer", async () => {
    const mockTrainer = {
      fullName: "Ana García",
      email: "ana@example.com",
      age: 28,
      district: "Madrid",
      favoriteType: "Agua",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const email = screen.getByText("ana@example.com");
    expect(email).toBeTruthy();
  });

  it("debe mostrar la edad con el formato correcto", async () => {
    const mockTrainer = {
      fullName: "Carlos López",
      email: "carlos@example.com",
      age: 30,
      district: "Barcelona",
      favoriteType: "Planta",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const age = screen.getByText("30 años");
    expect(age).toBeTruthy();
  });

  it("debe mostrar el distrito del trainer", async () => {
    const mockTrainer = {
      fullName: "María López",
      email: "maria@example.com",
      age: 27,
      district: "Sevilla",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const district = screen.getByText("Sevilla");
    expect(district).toBeTruthy();
  });

  it("debe mostrar el texto 'Entrenador Pokémon'", async () => {
    const mockTrainer = {
      fullName: "Test User",
      email: "test@example.com",
      age: 20,
      district: "TestCity",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const subtitle = screen.getByText("Entrenador Pokémon");
    expect(subtitle).toBeTruthy();
  });

  it("debe mostrar el emoji del tipo favorito", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const emoji = screen.getByText("🔥");
    expect(emoji).toBeTruthy();
  });

  it("debe mostrar el emoji de agua para tipo Agua", async () => {
    const mockTrainer = {
      fullName: "Marina López",
      email: "marina@example.com",
      age: 26,
      district: "Valencia",
      favoriteType: "Agua",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const emoji = screen.getByText("💧");
    expect(emoji).toBeTruthy();
  });

  it("debe mostrar el emoji de planta para tipo Planta", async () => {
    const mockTrainer = {
      fullName: "Pedro García",
      email: "pedro@example.com",
      age: 29,
      district: "Bilbao",
      favoriteType: "Planta",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const emoji = screen.getByText("🌿");
    expect(emoji).toBeTruthy();
  });

  it("debe renderizar PokemonTypeBadge con el tipo mapeado", async () => {
    const mockTrainer = {
      fullName: "Test User",
      email: "test@example.com",
      age: 20,
      district: "TestCity",
      favoriteType: "Fuego",
    };

    const mockMappedType = "fire";

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    (mapFavoriteType as unknown as jest.Mock).mockReturnValue(mockMappedType);

    await render(<TrainerCard />);

    expect(mapFavoriteType).toHaveBeenCalledWith("Fuego");
    const badge = screen.getByTestId("pokemon-type-badge-fire");
    expect(badge).toBeTruthy();
  });

  it("debe mostrar el botón 'Registrar nuevamente'", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const button = screen.getByText("Registrar nuevamente");
    expect(button).toBeTruthy();
  });

  it("debe llamar a clearTrainer cuando se presiona el botón", async () => {
    const mockClearTrainer = jest.fn();
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: mockClearTrainer }),
    );

    await render(<TrainerCard />);

    const button = screen.getByText("Registrar nuevamente");
    await fireEvent.press(button);

    expect(mockClearTrainer).toHaveBeenCalled();
  });

  it("debe tener accesibilidad en el botón", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const button = screen.getByText("Registrar nuevamente");
    expect(button.parent?.props?.accessible).toBe(true);
    expect(button.parent?.props?.accessibilityRole).toBe("button");
    expect(button.parent?.props?.accessibilityLabel).toBe("Registrar nuevamente");
  });

  it("debe mostrar el footer con #POKEDEX", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const footer = screen.getByText("#POKEDEX");
    expect(footer).toBeTruthy();
  });

  it("debe mostrar todos los iconos de información", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    expect(screen.getByText("Icon: mail")).toBeTruthy();
    expect(screen.getByText("Icon: gift")).toBeTruthy();
    expect(screen.getByText("Icon: location")).toBeTruthy();
  });

  it("debe mostrar el texto 'Tipo Favorito'", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const favoriteText = screen.getByText("Tipo Favorito");
    expect(favoriteText).toBeTruthy();
  });

  it("debe manejar nombres con diferentes caracteres especiales en avatar", async () => {
    const mockTrainer = {
      fullName: "José María Gutiérrez",
      email: "jose@example.com",
      age: 32,
      district: "Córdoba",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    const avatarText = screen.getByText("J");
    expect(avatarText).toBeTruthy();
  });

  it("debe llamar a useTrainerStore con el selector correcto", async () => {
    const mockTrainer = {
      fullName: "Test User",
      email: "test@example.com",
      age: 20,
      district: "TestCity",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockImplementation(
      (selector: any) => selector({ trainer: mockTrainer, clearTrainer: jest.fn() }),
    );

    await render(<TrainerCard />);

    expect(useTrainerStore).toHaveBeenCalled();
  });
});

import { fireEvent, render, screen } from "@testing-library/react-native";
import { useFormContext } from "react-hook-form";
import { Alert } from "react-native";
import { useTrainerStore } from "../../../store/trainer.store";
import { TrainerStepTwo } from "../TrainerStepTwo";

jest.mock("react-hook-form", () => ({ useFormContext: jest.fn() }));
jest.mock("../../../store/trainer.store");

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: jest.fn(() => <View />),
  };
});

jest.mock("../FormSelect", () => {
  const { View, Text } = require("react-native");
  return {
    FormSelect: jest.fn(({ label, name }) => (
      <View testID={`form-select-${name}`}>
        <Text>{label}</Text>
      </View>
    )),
  };
});

const setupMocks = ({
  handleSubmit = jest.fn((cb: any) => cb),
  saveTrainer = jest.fn(),
} = {}) => {
  (useFormContext as unknown as jest.Mock).mockReturnValue({
    control: {},
    handleSubmit,
  });
  (useTrainerStore as unknown as jest.Mock).mockImplementation(
    (selector: any) => selector({ saveTrainer }),
  );
};

describe("TrainerStepTwo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(jest.fn());
  });

  it("debe renderizar el título con emoji", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByText("Preferencias")).toBeTruthy();
  });

  it("debe renderizar el FormSelect de distrito", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByTestId("form-select-district")).toBeTruthy();
  });

  it("debe renderizar el FormSelect de tipo favorito", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByTestId("form-select-favoriteType")).toBeTruthy();
  });

  it("debe renderizar el botón Atrás", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByText("Atrás")).toBeTruthy();
  });

  it("debe renderizar el botón Guardar", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByText("Guardar")).toBeTruthy();
  });

  it("debe tener accesibilidad en el botón Atrás", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    const backButton = screen.getByText("Atrás");
    expect(backButton.parent?.props?.accessible).toBe(true);
    expect(backButton.parent?.props?.accessibilityRole).toBe("button");
    expect(backButton.parent?.props?.accessibilityLabel).toBe("Atrás");
  });

  it("debe tener accesibilidad en el botón Guardar", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    const saveButton = screen.getByText("Guardar");
    expect(saveButton.parent?.props?.accessible).toBe(true);
    expect(saveButton.parent?.props?.accessibilityRole).toBe("button");
    expect(saveButton.parent?.props?.accessibilityLabel).toBe(
      "Guardar y completar registro",
    );
  });

  it("debe llamar a onBack cuando se presiona el botón Atrás", async () => {
    const mockOnBack = jest.fn();
    setupMocks();

    await render(<TrainerStepTwo onBack={mockOnBack} onFinish={jest.fn()} />);

    await fireEvent.press(screen.getByText("Atrás"));

    expect(mockOnBack).toHaveBeenCalled();
  });

  it("debe llamar a saveTrainer cuando se presiona el botón Guardar", async () => {
    const mockSaveTrainer = jest.fn();
    const mockTrainerData = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    setupMocks({
      handleSubmit: jest.fn((callback: any) => () => callback(mockTrainerData)),
      saveTrainer: mockSaveTrainer,
    });

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    await fireEvent.press(screen.getByText("Guardar"));

    expect(mockSaveTrainer).toHaveBeenCalledWith(mockTrainerData);
  });

  it("debe mostrar Alert cuando se presiona Guardar", async () => {
    const mockTrainerData = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    setupMocks({
      handleSubmit: jest.fn((callback: any) => () => callback(mockTrainerData)),
    });

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    await fireEvent.press(screen.getByText("Guardar"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "¡Registro exitoso!",
      "Tu tarjeta de entrenador ha sido creada.",
    );
  });

  it("debe llamar a onFinish después de guardar", async () => {
    const mockOnFinish = jest.fn();
    const mockTrainerData = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    setupMocks({
      handleSubmit: jest.fn((callback: any) => () => callback(mockTrainerData)),
    });

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={mockOnFinish} />);

    await fireEvent.press(screen.getByText("Guardar"));

    expect(mockOnFinish).toHaveBeenCalled();
  });

  it("debe pasar el label correcto al FormSelect de distrito", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByText("Distrito de origen")).toBeTruthy();
  });

  it("debe pasar el label correcto al FormSelect de tipo favorito", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(screen.getByText("Tipo de Pokémon favorito")).toBeTruthy();
  });

  it("debe usar saveTrainer desde useTrainerStore", async () => {
    setupMocks();

    await render(<TrainerStepTwo onBack={jest.fn()} onFinish={jest.fn()} />);

    expect(useTrainerStore).toHaveBeenCalled();
  });
});
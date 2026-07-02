import { fireEvent, render, screen } from "@testing-library/react-native";
import { useFormContext } from "react-hook-form";
import { TrainerStepOne } from "../TrainerStepOne";

jest.mock("react-hook-form", () => ({ useFormContext: jest.fn() }));

jest.mock("../FormInput", () => {
  const { View, Text } = require("react-native");
  return {
    FormInput: jest.fn(({ label, name }) => (
      <View testID={`form-input-${name}`}>
        <Text>{label}</Text>
      </View>
    )),
  };
});

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: jest.fn(() => <View />),
  };
});

const setupMocks = ({ trigger = jest.fn() } = {}) => {
  (useFormContext as unknown as jest.Mock).mockReturnValue({
    control: {},
    trigger,
  });
};

describe("TrainerStepOne", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe renderizar el título con emoji", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Datos Personales")).toBeTruthy();
  });

  it("debe renderizar la descripción", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Cuéntanos un poco sobre ti.")).toBeTruthy();
  });

  it("debe renderizar el campo de nombre completo", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByTestId("form-input-fullName")).toBeTruthy();
  });

  it("debe renderizar el campo de edad", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByTestId("form-input-age")).toBeTruthy();
  });

  it("debe renderizar el campo de email", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByTestId("form-input-email")).toBeTruthy();
  });

  it("debe renderizar el botón continuar", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Continuar")).toBeTruthy();
  });

  it("debe tener accesibilidad en el botón", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    const button = screen.getByText("Continuar");
    expect(button.parent?.props?.accessible).toBe(true);
    expect(button.parent?.props?.accessibilityRole).toBe("button");
    expect(button.parent?.props?.accessibilityLabel).toBe(
      "Continuar al siguiente paso",
    );
  });

  it("debe llamar a trigger con los campos correctos al presionar continuar", async () => {
    const mockTrigger = jest.fn().mockResolvedValue(false);
    setupMocks({ trigger: mockTrigger });

    await render(<TrainerStepOne onNext={jest.fn()} />);

    await fireEvent.press(screen.getByText("Continuar"));

    expect(mockTrigger).toHaveBeenCalledWith(["fullName", "age", "email"]);
  });

  it("debe llamar a onNext cuando la validación es exitosa", async () => {
    const mockOnNext = jest.fn();
    const mockTrigger = jest.fn().mockResolvedValue(true);
    setupMocks({ trigger: mockTrigger });

    await render(<TrainerStepOne onNext={mockOnNext} />);

    await fireEvent.press(screen.getByText("Continuar"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnNext).toHaveBeenCalled();
  });

  it("debe no llamar a onNext cuando la validación falla", async () => {
    const mockOnNext = jest.fn();
    const mockTrigger = jest.fn().mockResolvedValue(false);
    setupMocks({ trigger: mockTrigger });

    await render(<TrainerStepOne onNext={mockOnNext} />);

    await fireEvent.press(screen.getByText("Continuar"));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it("debe mostrar label correcto en FormInput fullName", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Nombre completo")).toBeTruthy();
  });

  it("debe mostrar label correcto en FormInput age", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Edad")).toBeTruthy();
  });

  it("debe mostrar label correcto en FormInput email", async () => {
    setupMocks();

    await render(<TrainerStepOne onNext={jest.fn()} />);

    expect(screen.getByText("Correo electrónico")).toBeTruthy();
  });
});
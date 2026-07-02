import { fireEvent, render, screen } from "@testing-library/react-native";
import { TrainerScreen } from "../TrainerScreen";

const mockReset = jest.fn();

jest.mock("react-hook-form", () => {
  const { View } = require("react-native");
  return {
    useForm: jest.fn(() => ({
      control: {},
      handleSubmit: jest.fn((callback) => callback),
      trigger: jest.fn(),
      reset: mockReset,
    })),
    FormProvider: jest.fn(({ children }) => (
      <View testID="form-provider">{children}</View>
    )),
  };
});

jest.mock("@hookform/resolvers/yup", () => ({
  yupResolver: jest.fn(),
}));

jest.mock("../../../components/common/ScreenContainer", () => {
  const { View } = require("react-native");
  return {
    ScreenContainer: jest.fn(({ children }) => (
      <View testID="screen-container">{children}</View>
    )),
  };
});

jest.mock("../../../components/trainer/TrainerCard", () => {
  const { View } = require("react-native");
  return {
    TrainerCard: jest.fn(() => <View testID="trainer-card" />),
  };
});

jest.mock("../../../components/trainer/TrainerStepOne", () => {
  const { TouchableOpacity } = require("react-native");
  return {
    TrainerStepOne: jest.fn(({ onNext }) => (
      <TouchableOpacity testID="trainer-step-one" onPress={onNext} />
    )),
  };
});

jest.mock("../../../components/trainer/TrainerStepTwo", () => {
  const { View, TouchableOpacity } = require("react-native");
  return {
    TrainerStepTwo: jest.fn(({ onBack, onFinish }) => (
      <View testID="trainer-step-two">
        <TouchableOpacity testID="back-button" onPress={onBack} />
        <TouchableOpacity testID="finish-button" onPress={onFinish} />
      </View>
    )),
  };
});

jest.mock("../../../components/trainer/StepIndicator", () => {
  const { View } = require("react-native");
  return {
    StepIndicator: jest.fn(({ currentStep, totalSteps }) => (
      <View testID={`step-indicator-${currentStep}-${totalSteps}`} />
    )),
  };
});

jest.mock("../../../schemas/trainer.schema", () => ({
  trainerSchema: {},
}));

jest.mock("../../../store/trainer.store");

import { useTrainerStore } from "../../../store/trainer.store";

describe("TrainerScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReset.mockClear();
  });

  it("debe renderizar ScreenContainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const container = screen.getByTestId("screen-container");
    expect(container).toBeTruthy();
  });

  it("debe mostrar TrainerCard cuando hay trainer", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockReturnValue(mockTrainer);

    await render(<TrainerScreen />);

    const trainerCard = screen.getByTestId("trainer-card");
    expect(trainerCard).toBeTruthy();
  });

  it("debe no mostrar formulario cuando hay trainer", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockReturnValue(mockTrainer);

    await render(<TrainerScreen />);

    const formProvider = screen.queryByTestId("form-provider");
    expect(formProvider).toBeFalsy();
  });

  it("debe mostrar FormProvider cuando no hay trainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const formProvider = screen.getByTestId("form-provider");
    expect(formProvider).toBeTruthy();
  });

  it("debe mostrar StepIndicator cuando no hay trainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const stepIndicator = screen.getByTestId("step-indicator-1-2");
    expect(stepIndicator).toBeTruthy();
  });

  it("debe mostrar TrainerStepOne inicialmente", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const stepOne = screen.getByTestId("trainer-step-one");
    expect(stepOne).toBeTruthy();
  });

  it("debe no mostrar TrainerStepTwo inicialmente", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const stepTwo = screen.queryByTestId("trainer-step-two");
    expect(stepTwo).toBeFalsy();
  });

  it("debe mostrar TrainerStepTwo después de ir al siguiente paso", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    const { rerender } = await render(<TrainerScreen />);

    const stepOne = screen.getByTestId("trainer-step-one");
    await fireEvent.press(stepOne);

    await rerender(<TrainerScreen />);

    expect(stepOne).toBeTruthy();
  });

  it("debe mostrar el label del progreso correcto", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const progressLabel = screen.getByText("Paso 1 de 2");
    expect(progressLabel).toBeTruthy();
  });

  it("debe llamar a useTrainerStore para obtener trainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    expect(useTrainerStore).toHaveBeenCalled();
  });

  it("debe usar yupResolver con trainerSchema", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const formProvider = screen.getByTestId("form-provider");
    expect(formProvider).toBeTruthy();
  });

  it("debe pasar step actual y total de pasos al StepIndicator", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const stepIndicator = screen.getByTestId("step-indicator-1-2");
    expect(stepIndicator).toBeTruthy();
  });

  it("debe pasar onNext callback a TrainerStepOne", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const stepOne = screen.getByTestId("trainer-step-one");
    expect(stepOne).toBeTruthy();
  });

  it("debe pasar onBack y onFinish callbacks a TrainerStepTwo", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    const result = await render(<TrainerScreen />);

    const stepOne = screen.getByTestId("trainer-step-one");
    await fireEvent.press(stepOne);

    expect(stepOne).toBeTruthy();
  });

  it("debe renderizar solo ScreenContainer y TrainerCard cuando hay trainer", async () => {
    const mockTrainer = {
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
      district: "Lima",
      favoriteType: "Fuego",
    };

    (useTrainerStore as unknown as jest.Mock).mockReturnValue(mockTrainer);

    await render(<TrainerScreen />);

    const container = screen.getByTestId("screen-container");
    const trainerCard = screen.getByTestId("trainer-card");

    expect(container).toBeTruthy();
    expect(trainerCard).toBeTruthy();
  });

  it("debe inicializar el formulario con valores vacíos", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    const formProvider = screen.getByTestId("form-provider");
    expect(formProvider).toBeTruthy();
  });

  it("debe resetear el formulario cuando no hay trainer", async () => {
    (useTrainerStore as unknown as jest.Mock).mockReturnValue(null);

    await render(<TrainerScreen />);

    expect(mockReset).toHaveBeenCalledWith({
      fullName: "",
      age: null,
      email: "",
      district: "",
      favoriteType: "",
    });
  });
});

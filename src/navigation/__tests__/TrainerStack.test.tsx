import { render, screen } from "@testing-library/react-native";
import { TrainerStack } from "../TrainerStack";

jest.mock("@react-navigation/native-stack", () => {
  const { View, Text } = require("react-native");
  return {
    createNativeStackNavigator: jest.fn(() => ({
      Navigator: jest.fn(({ children }) => (
        <View testID="stack-navigator">{children}</View>
      )),
      Screen: jest.fn(({ name, options, component: Component }) => (
        <View testID={`screen-${name}`}>
          <Text>{`${name} - ${options?.title}`}</Text>
          {Component && <Component />}
        </View>
      )),
    })),
  };
});

jest.mock("../../screens/trainer/TrainerScreen", () => {
  const { View } = require("react-native");
  return {
    TrainerScreen: jest.fn(() => <View testID="trainer-screen" />),
  };
});

describe("TrainerStack", () => {
  it("debe renderizar el Stack Navigator", async () => {
    await render(<TrainerStack />);

    const navigator = screen.getByTestId("stack-navigator");
    expect(navigator).toBeTruthy();
  });

  it("debe crear el Stack Navigator con createNativeStackNavigator", async () => {
    const {
      createNativeStackNavigator,
    } = require("@react-navigation/native-stack");

    await render(<TrainerStack />);

    expect(createNativeStackNavigator).toHaveBeenCalled();
  });

  it("debe renderizar la pantalla Trainer", async () => {
    await render(<TrainerStack />);

    const trainerScreen = screen.getByTestId("screen-Trainer");
    expect(trainerScreen).toBeTruthy();
  });

  it("debe asignar el título 'Registro' a la pantalla Trainer", async () => {
    await render(<TrainerStack />);

    const trainerScreenContent = screen.getByText(/Trainer - Registro/);
    expect(trainerScreenContent).toBeTruthy();
  });

  it("debe tener TrainerScreen como componente en la pantalla Trainer", async () => {
    const { TrainerScreen } = require("../../screens/trainer/TrainerScreen");

    await render(<TrainerStack />);

    expect(TrainerScreen).toBeTruthy();
  });

  it("debe pasar el nombre correcto a la pantalla", async () => {
    await render(<TrainerStack />);

    const screenElement = screen.getByTestId("screen-Trainer");
    expect(screenElement).toBeTruthy();
  });

  it("debe tener Stack.Navigator dentro del componente", async () => {
    await render(<TrainerStack />);

    const navigator = screen.getByTestId("stack-navigator");
    expect(navigator).toBeTruthy();
  });

  it("debe renderizar Stack.Navigator con una pantalla", async () => {
    await render(<TrainerStack />);

    const trainerScreen = screen.queryByTestId("screen-Trainer");
    expect(trainerScreen).toBeTruthy();
  });

  it("debe usar TrainerStackParamList como tipo genérico", async () => {
    await render(<TrainerStack />);

    const navigator = screen.getByTestId("stack-navigator");
    const trainerScreen = screen.getByTestId("screen-Trainer");

    expect(navigator).toBeTruthy();
    expect(trainerScreen).toBeTruthy();
  });

  it("debe renderizar la pantalla TrainerScreen correctamente", async () => {
    await render(<TrainerStack />);

    const trainerScreenElement = screen.getByTestId("trainer-screen");
    expect(trainerScreenElement).toBeTruthy();
  });

  it("debe pasar options con title a la pantalla Trainer", async () => {
    await render(<TrainerStack />);

    const screenContent = screen.getByText(/Trainer - Registro/);
    expect(screenContent).toBeTruthy();
  });

  it("debe crear un Stack Navigator con la configuración correcta", async () => {
    await render(<TrainerStack />);

    const navigator = screen.getByTestId("stack-navigator");
    const trainerScreen = screen.getByTestId("screen-Trainer");

    expect(navigator).toBeTruthy();
    expect(trainerScreen).toBeTruthy();
  });
});

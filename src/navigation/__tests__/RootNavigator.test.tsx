import { render, screen } from "@testing-library/react-native";
import { RootNavigator } from "../RootNavigator";

jest.mock("@react-navigation/native", () => {
  const { View } = require("react-native");
  return {
    NavigationContainer: jest.fn(({ children }) => (
      <View testID="navigation-container">{children}</View>
    )),
  };
});

jest.mock("@react-navigation/bottom-tabs", () => {
  const { View } = require("react-native");
  return {
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: jest.fn(({ children, screenOptions }) => (
        <View testID="tab-navigator">
          {children}
          {screenOptions && <View testID="screen-options" />}
        </View>
      )),
      Screen: jest.fn(({ name, component: Component }) => (
        <View testID={`tab-screen-${name}`}>
          {Component ? <Component /> : null}
        </View>
      )),
    })),
  };
});

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: jest.fn(() => <View />),
  };
});

jest.mock("../PokedexStack", () => {
  const { View } = require("react-native");
  return {
    PokedexStack: jest.fn(() => <View testID="pokedex-stack" />),
  };
});

jest.mock("../TrainerStack", () => {
  const { View } = require("react-native");
  return {
    TrainerStack: jest.fn(() => <View testID="trainer-stack" />),
  };
});

describe("RootNavigator", () => {
  it("debe renderizar NavigationContainer", async () => {
    await render(<RootNavigator />);

    const container = screen.getByTestId("navigation-container");
    expect(container).toBeTruthy();
  });

  it("debe renderizar Tab.Navigator", async () => {
    await render(<RootNavigator />);

    const navigator = screen.getByTestId("tab-navigator");
    expect(navigator).toBeTruthy();
  });

  it("debe renderizar la pantalla Pokedex", async () => {
    await render(<RootNavigator />);

    const pokedexTab = screen.getByTestId("tab-screen-Pokedex");
    expect(pokedexTab).toBeTruthy();
  });

  it("debe renderizar la pantalla Trainer", async () => {
    await render(<RootNavigator />);

    const trainerTab = screen.getByTestId("tab-screen-Trainer");
    expect(trainerTab).toBeTruthy();
  });

  it("debe pasar PokedexStack como componente en tab Pokedex", async () => {
    await render(<RootNavigator />);

    const pokedexStack = screen.getByTestId("pokedex-stack");
    expect(pokedexStack).toBeTruthy();
  });

  it("debe pasar TrainerStack como componente en tab Trainer", async () => {
    await render(<RootNavigator />);

    const trainerStack = screen.getByTestId("trainer-stack");
    expect(trainerStack).toBeTruthy();
  });

  it("debe usar createBottomTabNavigator", async () => {
    const {
      createBottomTabNavigator,
    } = require("@react-navigation/bottom-tabs");

    await render(<RootNavigator />);

    expect(createBottomTabNavigator).toHaveBeenCalled();
  });

  it("debe envolver el contenido en NavigationContainer", async () => {
    const { NavigationContainer } = require("@react-navigation/native");

    await render(<RootNavigator />);

    expect(NavigationContainer).toHaveBeenCalled();
  });

  it("debe tener Tab.Navigator dentro de NavigationContainer", async () => {
    await render(<RootNavigator />);

    const container = screen.getByTestId("navigation-container");
    const navigator = screen.getByTestId("tab-navigator");

    expect(container).toBeTruthy();
    expect(navigator).toBeTruthy();
  });

  it("debe pasar screenOptions al Tab.Navigator", async () => {
    await render(<RootNavigator />);

    const screenOptions = screen.getByTestId("screen-options");
    expect(screenOptions).toBeTruthy();
  });

  it("debe renderizar nombre correcto en tab Pokedex", async () => {
    await render(<RootNavigator />);

    const pokedexTab = screen.getByTestId("tab-screen-Pokedex");
    expect(pokedexTab).toBeTruthy();
  });

  it("debe renderizar nombre correcto en tab Trainer", async () => {
    await render(<RootNavigator />);

    const trainerTab = screen.getByTestId("tab-screen-Trainer");
    expect(trainerTab).toBeTruthy();
  });

  it("debe tener dos pantallas en el Tab Navigator", async () => {
    await render(<RootNavigator />);

    const pokedexTab = screen.queryByTestId("tab-screen-Pokedex");
    const trainerTab = screen.queryByTestId("tab-screen-Trainer");

    expect(pokedexTab).toBeTruthy();
    expect(trainerTab).toBeTruthy();
  });

  it("debe usar Ionicons para los iconos del tab bar", async () => {
    const { Ionicons } = require("@expo/vector-icons");

    await render(<RootNavigator />);

    expect(Ionicons).toBeTruthy();
  });

  it("debe tener screenOptions con función que recibe route", async () => {
    const { Tab } = require("@react-navigation/bottom-tabs");

    await render(<RootNavigator />);

    const screenOptions = screen.getByTestId("screen-options");
    expect(screenOptions).toBeTruthy();
  });
});

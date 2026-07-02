import { render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { ScreenContainer } from "../ScreenContainer";

describe("ScreenContainer", () => {
  it("debe renderizar el componente", async () => {
    await render(
      <ScreenContainer>
        <Text>Contenido</Text>
      </ScreenContainer>,
    );

    const text = screen.getByText("Contenido");
    expect(text).toBeTruthy();
  });

  it("debe renderizar un único hijo", async () => {
    await render(
      <ScreenContainer>
        <Text>Solo un hijo</Text>
      </ScreenContainer>,
    );

    const text = screen.getByText("Solo un hijo");
    expect(text).toBeTruthy();
  });

  it("debe renderizar múltiples hijos", async () => {
    await render(
      <ScreenContainer>
        <Text>Primer hijo</Text>
        <Text>Segundo hijo</Text>
        <Text>Tercer hijo</Text>
      </ScreenContainer>,
    );

    expect(screen.getByText("Primer hijo")).toBeTruthy();
    expect(screen.getByText("Segundo hijo")).toBeTruthy();
    expect(screen.getByText("Tercer hijo")).toBeTruthy();
  });

  it("debe permitir children sin propiedades de texto", async () => {
    await render(
      <ScreenContainer>
        <View>
          <Text>Hijo dentro de View</Text>
        </View>
      </ScreenContainer>,
    );

    const text = screen.getByText("Hijo dentro de View");
    expect(text).toBeTruthy();
  });

  it("debe renderizar con children null", async () => {
    await render(<ScreenContainer>{null}</ScreenContainer>);

    expect(() => {
      screen.getByText("Cualquier texto");
    }).toThrow();
  });

  it("debe renderizar con children undefined", async () => {
    await render(<ScreenContainer>{undefined}</ScreenContainer>);

    expect(() => {
      screen.getByText("Cualquier texto");
    }).toThrow();
  });

  it("debe renderizar diferentes tipos de contenido", async () => {
    await render(
      <ScreenContainer>
        <Text>Texto normal</Text>
        <View>
          <Text>Texto dentro de View</Text>
        </View>
      </ScreenContainer>,
    );

    expect(screen.getByText("Texto normal")).toBeTruthy();
    expect(screen.getByText("Texto dentro de View")).toBeTruthy();
  });

  it("debe ser compatible con React.Fragment", async () => {
    await render(
      <ScreenContainer>
        <>
          <Text>Fragmento 1</Text>
          <Text>Fragmento 2</Text>
        </>
      </ScreenContainer>,
    );

    expect(screen.getByText("Fragmento 1")).toBeTruthy();
    expect(screen.getByText("Fragmento 2")).toBeTruthy();
  });

  it("debe renderizar componentes anidados complejos", async () => {
    await render(
      <ScreenContainer>
        <View>
          <View>
            <Text>Anidado profundo</Text>
          </View>
        </View>
      </ScreenContainer>,
    );

    const text = screen.getByText("Anidado profundo");
    expect(text).toBeTruthy();
  });

  it("debe renderizar correctamente sin prop style", async () => {
    await render(
      <ScreenContainer>
        <Text>Sin style prop</Text>
      </ScreenContainer>,
    );

    const text = screen.getByText("Sin style prop");
    expect(text).toBeTruthy();
  });

  it("debe mantener la estructura SafeAreaView", async () => {
    await render(
      <ScreenContainer>
        <Text>Contenido seguro</Text>
      </ScreenContainer>,
    );

    const text = screen.getByText("Contenido seguro");
    expect(text).toBeTruthy();
  });

  it("debe renderizar children como array de elementos", async () => {
    const childrenArray = [
      <Text key="1">Elemento 1</Text>,
      <Text key="2">Elemento 2</Text>,
      <Text key="3">Elemento 3</Text>,
    ];

    await render(<ScreenContainer>{childrenArray}</ScreenContainer>);

    expect(screen.getByText("Elemento 1")).toBeTruthy();
    expect(screen.getByText("Elemento 2")).toBeTruthy();
    expect(screen.getByText("Elemento 3")).toBeTruthy();
  });
});

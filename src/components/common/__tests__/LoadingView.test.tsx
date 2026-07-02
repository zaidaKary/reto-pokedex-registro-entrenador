import { render, screen } from "@testing-library/react-native";
import { LoadingView } from "../LoadingView";

describe("LoadingView", () => {
  it("render renderizar el componente", async () => {
    await render(<LoadingView />);

    const text = screen.getByText("Cargando...");
    expect(text).toBeTruthy();
  });

  it("render renderizar el mensaje por defecto", async () => {
    await render(<LoadingView />);

    const message = screen.getByText("Cargando...");
    expect(message).toBeTruthy();
  });

  it("render renderizar un mensaje personalizado", async () => {
    const customMessage = "Cargando Pokémon...";
    await render(<LoadingView message={customMessage} />);

    const message = screen.getByText(customMessage);
    expect(message).toBeTruthy();
  });

  it("render renderizar en modo normal cuando compact es false", async () => {
    await render(<LoadingView compact={false} />);

    const message = screen.getByText("Cargando...");
    expect(message).toBeTruthy();
  });

  it("render renderizar en modo compacto cuando compact es true", async () => {
    await render(<LoadingView compact={true} message="Cargando más..." />);

    const message = screen.getByText("Cargando más...");
    expect(message).toBeTruthy();
  });

  it("render renderizar con mensaje personalizado y modo compacto", async () => {
    const customMessage = "Obteniendo detalles...";
    await render(<LoadingView message={customMessage} compact={true} />);

    const message = screen.getByText(customMessage);
    expect(message).toBeTruthy();
  });

  it("debe aceptar diferentes mensajes", async () => {
    const messages = [
      "Cargando lista de Pokémon...",
      "Buscando Pokémon...",
      "Guardando entrenador...",
    ];

    for (const msg of messages) {
      await render(<LoadingView message={msg} />);
      expect(screen.getByText(msg)).toBeTruthy();
    }
    });
      it("debe cambiar entre modo normal y compacto", async () => {
    await render(<LoadingView message="Cargando" compact={false} />);

    expect(screen.getByText("Cargando")).toBeTruthy();

    await render(<LoadingView message="Cargando" compact={true} />);

    expect(screen.getByText("Cargando")).toBeTruthy();
  });

  it("debe soportar mensaje vacío", async () => {
    await render(<LoadingView message="" />);

    expect(screen.queryByText("Cargando...")).toBeNull();
  });

  it("debe aceptar todas las combinaciones de props", async () => {
    const combinations = [
      { message: "Test 1", compact: false },
      { message: "Test 2", compact: true },
      { message: "Test 3", compact: undefined },
      { compact: false },
      { compact: true },
    ];

    for (const props of combinations) {
      await render(<LoadingView {...props} />);

      if (props.message) {
        expect(screen.getByText(props.message)).toBeTruthy();
      } else {
        expect(screen.getByText("Cargando...")).toBeTruthy();
      }
    };
  });
});
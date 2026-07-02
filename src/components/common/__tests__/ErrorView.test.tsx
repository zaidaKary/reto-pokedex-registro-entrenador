import { fireEvent, render, screen } from "@testing-library/react-native";
import { ErrorView } from "../ErrorView";

describe("ErrorView", () => {
  it("debe renderizar el título de error", async () => {
    await render(<ErrorView />);

    const title = screen.getByText("Ocurrió un problema");
    expect(title).toBeTruthy();
  });

  it("debe renderizar el mensaje por defecto cuando no se proporciona uno", async () => {
    await render(<ErrorView />);

    const message = screen.getByText("Ha ocurrido un error.");
    expect(message).toBeTruthy();
  });

  it("debe renderizar un mensaje personalizado cuando se proporciona", async () => {
    const customMessage = "Error de conexión con el servidor";
    await render(<ErrorView message={customMessage} />);

    const message = screen.getByText(customMessage);
    expect(message).toBeTruthy();
  });

  it("debe mostrar el botón Reintentar cuando se proporciona la función onRetry", async () => {
    const onRetry = jest.fn();
    await render(<ErrorView onRetry={onRetry} />);

    const button = screen.getByText("Reintentar");
    expect(button).toBeTruthy();
  });

  it("no debe mostrar el botón Reintentar cuando no se proporciona onRetry", async () => {
    await render(<ErrorView />);

    const button = screen.queryByText("Reintentar");
    expect(button).toBeNull();
  });

  it("debe llamar a onRetry cuando se presiona el botón Reintentar", async () => {
    const onRetry = jest.fn();
    await render(<ErrorView onRetry={onRetry} />);

    const button = screen.getByText("Reintentar");
    await fireEvent.press(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a onRetry múltiples veces cuando se presiona varias veces", async () => {
    const onRetry = jest.fn();
    await render(<ErrorView onRetry={onRetry} />);

    const button = screen.getByText("Reintentar");
    await fireEvent.press(button);
    await fireEvent.press(button);
    await fireEvent.press(button);

    expect(onRetry).toHaveBeenCalledTimes(3);
  });

  it("debe renderizar correctamente con mensaje personalizado y onRetry", async () => {
    const customMessage = "No se pudo cargar la lista de Pokémon";
    const onRetry = jest.fn();

    await render(<ErrorView message={customMessage} onRetry={onRetry} />);

    expect(screen.getByText("Ocurrió un problema")).toBeTruthy();
    expect(screen.getByText(customMessage)).toBeTruthy();
    expect(screen.getByText("Reintentar")).toBeTruthy();
  });

  it("debe renderizar todos los elementos en el contenedor principal", async () => {
    const onRetry = jest.fn();
    await render(<ErrorView message="Error de prueba" onRetry={onRetry} />);

    const title = screen.getByText("Ocurrió un problema");
    const message = screen.getByText("Error de prueba");
    const button = screen.getByText("Reintentar");

    expect(title).toBeTruthy();
    expect(message).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("debe mostrar solo el título y mensaje cuando no hay onRetry", async () => {
    await render(<ErrorView message="Error de prueba" />);

    expect(screen.getByText("Ocurrió un problema")).toBeTruthy();
    expect(screen.getByText("Error de prueba")).toBeTruthy();
    expect(screen.queryByText("Reintentar")).toBeNull();
  });

  it("debe mostrar el título, mensaje y botón cuando hay onRetry", async () => {
    const onRetry = jest.fn();
    await render(<ErrorView message="Error de prueba" onRetry={onRetry} />);

    expect(screen.getByText("Ocurrió un problema")).toBeTruthy();
    expect(screen.getByText("Error de prueba")).toBeTruthy();
    expect(screen.getByText("Reintentar")).toBeTruthy();
  });

  it("debe cambiar el mensaje cuando se actualiza la prop", async () => {
    const onRetry = jest.fn();

    await render(<ErrorView message="Primer error" onRetry={onRetry} />);

    expect(screen.getByText("Primer error")).toBeTruthy();
  });
});

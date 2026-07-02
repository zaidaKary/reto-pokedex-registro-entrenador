import { fireEvent, render, screen } from "@testing-library/react-native";
import { SearchBar } from "../SearchBar";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: jest.fn(({ name }) => {
    return <div data-testid={`icon-${name}`} />;
  }),
}));

describe("SearchBar", () => {
  it("debe renderizar el componente", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    expect(input).toBeTruthy();
  });

  it("debe renderizar el TextInput con placeholder correcto", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    expect(input).toBeTruthy();
  });

  it("debe mostrar el valor inicial en el input", async () => {
    const onChangeText = jest.fn();
    const initialValue = "Pikachu";

    await render(<SearchBar value={initialValue} onChangeText={onChangeText} />);

    const input = screen.getByDisplayValue("Pikachu");
    expect(input).toBeTruthy();
  });

  it("debe llamar a onChangeText cuando se cambia el texto", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "Charizard");

    expect(onChangeText).toHaveBeenCalledWith("Charizard");
  });

  it("debe llamar a onChangeText una sola vez por cambio", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "Blastoise");

    expect(onChangeText).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a onChangeText múltiples veces cuando hay múltiples cambios", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "P");
    await fireEvent.changeText(input, "Pi");
    await fireEvent.changeText(input, "Pik");
    await fireEvent.changeText(input, "Pika");
    await fireEvent.changeText(input, "Pikac");
    await fireEvent.changeText(input, "Pikachu");

    expect(onChangeText).toHaveBeenCalledTimes(6);
  });

  it("debe manejar texto vacío", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "");

    expect(onChangeText).toHaveBeenCalledWith("");
  });

  it("debe manejar texto con espacios", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "Fire Type");

    expect(onChangeText).toHaveBeenCalledWith("Fire Type");
  });

  it("debe manejar texto largo", async () => {
    const onChangeText = jest.fn();
    const longText =
      "Este es un texto muy largo para probar el input de búsqueda";

    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, longText);

    expect(onChangeText).toHaveBeenCalledWith(longText);
  });

  it("debe actualizar el valor cuando cambia la prop", async () => {
    const onChangeText = jest.fn();

    await render(<SearchBar value="Squirtle" onChangeText={onChangeText} />);

    let input = screen.getByDisplayValue("Squirtle");
    expect(input).toBeTruthy();

    await render(<SearchBar value="Wartortle" onChangeText={onChangeText} />);

    input = screen.getByDisplayValue("Wartortle");
    expect(input).toBeTruthy();
  });

  it("debe aceptar números en la búsqueda", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "004");

    expect(onChangeText).toHaveBeenCalledWith("004");
  });

  it("debe aceptar caracteres especiales", async () => {
    const onChangeText = jest.fn();
    await render(<SearchBar value="" onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Buscar Pokémon...");
    await fireEvent.changeText(input, "Pokémon-2024");

    expect(onChangeText).toHaveBeenCalledWith("Pokémon-2024");
  });

  it("debe renderizar con diferentes valores", async () => {
    const onChangeText = jest.fn();
    const testValues = ["Bulbasaur", "Charmander", "Squirtle"];

    for (const value of testValues) {
      await render(<SearchBar value={value} onChangeText={onChangeText} />);

      const input = screen.getByDisplayValue(value);
      expect(input).toBeTruthy();
    }
  });
});

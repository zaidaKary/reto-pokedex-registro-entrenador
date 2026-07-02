import { fireEvent, render, screen } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { FormSelect } from "../FormSelect";

interface TestFormData {
  favoriteType: string;
  district: string;
}

const TEST_OPTIONS = [
  { label: "Fire", value: "fire" },
  { label: "Water", value: "water" },
  { label: "Grass", value: "grass" },
];

const TestFormWrapper = ({
  options = TEST_OPTIONS,
}: {
  options?: Array<{ label: string; value: string }>;
} = {}) => {
  const { control } = useForm<TestFormData>({
    defaultValues: {
      favoriteType: "",
      district: "",
    },
  });

  return (
    <FormSelect<TestFormData>
      control={control}
      name="favoriteType"
      label="Tipo de Pokémon Favorito"
      options={options}
    />
  );
};

describe("FormSelect", () => {
  it("debe renderizar el componente", async () => {
    await render(<TestFormWrapper />);

    const label = screen.getByText("Tipo de Pokémon Favorito");
    expect(label).toBeTruthy();
  });

  it("debe mostrar el label correctamente", async () => {
    await render(<TestFormWrapper />);

    const label = screen.getByText("Tipo de Pokémon Favorito");
    expect(label).toBeTruthy();
  });

  it("debe renderizar el botón de selección", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    expect(button).toBeTruthy();
  });

  it("debe mostrar texto 'Seleccionar' cuando no hay valor", async () => {
    await render(<TestFormWrapper />);

    const text = screen.getByText("Seleccionar");
    expect(text).toBeTruthy();
  });

  it("debe abrir el modal cuando se presiona el botón", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const option = screen.getByText("Fire");
    expect(option).toBeTruthy();
  });

  it("debe mostrar todas las opciones en el modal", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    expect(screen.getByText("Fire")).toBeTruthy();
    expect(screen.getByText("Water")).toBeTruthy();
    expect(screen.getByText("Grass")).toBeTruthy();
  });

  it("debe seleccionar una opción cuando se presiona", async () => {
    await render(<TestFormWrapper />);

    let button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const fireOption = screen.getByText("Fire");
    await fireEvent.press(fireOption);

    button = screen.getByText("fire");
    expect(button).toBeTruthy();
  });

  it("debe cerrar el modal después de seleccionar una opción", async () => {
    await render(<TestFormWrapper />);

    let button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const waterOption = screen.getByText("Water");
    await fireEvent.press(waterOption);

    const cancelButton = screen.queryByText("Cancelar");
    expect(cancelButton).toBeFalsy();
  });

  it("debe mostrar el botón cancelar en el modal", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const cancelButton = screen.getByText("Cancelar");
    expect(cancelButton).toBeTruthy();
  });

  it("debe cerrar el modal cuando se presiona cancelar", async () => {
    await render(<TestFormWrapper />);

    let button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const cancelButton = screen.getByText("Cancelar");
    await fireEvent.press(cancelButton);

    expect(screen.queryByText("Fire")).toBeFalsy();
  });

  it("debe mantener el valor seleccionado después de cerrar el modal", async () => {
    await render(<TestFormWrapper />);

    let button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const grassOption = screen.getByText("Grass");
    await fireEvent.press(grassOption);

    button = screen.getByText("grass");
    expect(button).toBeTruthy();
  });

  it("debe manejar múltiples selecciones", async () => {
    await render(<TestFormWrapper />);

    let button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    let option = screen.getByText("Fire");
    await fireEvent.press(option);

    button = screen.getByText("fire");
    expect(button).toBeTruthy();

    await fireEvent.press(button);
    option = screen.getByText("Water");
    await fireEvent.press(option);

    button = screen.getByText("water");
    expect(button).toBeTruthy();
  });

  it("debe renderizar opciones personalizadas", async () => {
    const customOptions = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ];

    await render(<TestFormWrapper options={customOptions} />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    expect(screen.getByText("Option 1")).toBeTruthy();
    expect(screen.getByText("Option 2")).toBeTruthy();
  });

  it("debe tener propiedades de accesibilidad en las opciones", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const fireOption = screen.getByText("Fire");
    expect(fireOption.parent?.props?.accessible).toBe(true);
    expect(fireOption.parent?.props?.accessibilityRole).toBe("button");
  });

  it("debe tener accessibilityHint con valor seleccionado", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const fireOption = screen.getByText("Fire");
    expect(fireOption.parent?.props?.accessibilityHint).toContain(
      "tipo de pokémon favorito",
    );
    expect(fireOption.parent?.props?.accessibilityHint).toContain("ninguno");
  });

  it("debe actualizar accessibilityState cuando el modal está visible", async () => {
    await render(<TestFormWrapper />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const fireOption = screen.getByText("Fire");
    expect(fireOption.parent?.props?.accessibilityState?.expanded).toBe(true);
  });

  it("debe manejar lista vacía de opciones", async () => {
    await render(<TestFormWrapper options={[]} />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    const cancelButton = screen.getByText("Cancelar");
    expect(cancelButton).toBeTruthy();
  });

  it("debe manejar opciones con caracteres especiales", async () => {
    const specialOptions = [
      { label: "Fuego/Volador", value: "fire-flying" },
      { label: "Agua/Hielo", value: "water-ice" },
    ];

    await render(<TestFormWrapper options={specialOptions} />);

    const button = screen.getByText("Seleccionar");
    await fireEvent.press(button);

    expect(screen.getByText("Fuego/Volador")).toBeTruthy();
    expect(screen.getByText("Agua/Hielo")).toBeTruthy();
  });
});

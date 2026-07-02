import { fireEvent, render, screen } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput";

interface TestFormData {
  fullName: string;
  email: string;
  age: string;
}

const TestFormWrapper = ({
  onChangeText,
  sanitizeValue,
}: {
  onChangeText?: (value: string) => void;
  sanitizeValue?: (value: string) => string | number | undefined;
}) => {
  const { control } = useForm<TestFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      age: "",
    },
  });

  return (
    <FormInput<TestFormData>
      control={control}
      name="fullName"
      label="Nombre Completo"
      placeholder="Ingrese su nombre"
      onChangeText={onChangeText}
      sanitizeValue={sanitizeValue}
    />
  );
};

describe("FormInput", () => {
  it("debe renderizar el componente", async () => {
    await render(<TestFormWrapper />);

    const label = screen.getByText("Nombre Completo");
    expect(label).toBeTruthy();
  });

  it("debe mostrar el label correctamente", async () => {
    await render(<TestFormWrapper />);

    const label = screen.getByText("Nombre Completo");
    expect(label).toBeTruthy();
  });

  it("debe renderizar el TextInput", async () => {
    await render(<TestFormWrapper />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    expect(input).toBeTruthy();
  });

  it("debe manejar el cambio de texto", async () => {
    const onChangeText = jest.fn();
    await render(<TestFormWrapper onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "Juan Pérez");

    expect(onChangeText).toHaveBeenCalledWith("Juan Pérez");
  });

  it("debe mostrar valor inicial vacío", async () => {
    await render(<TestFormWrapper />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    expect(input.props.value).toBe("");
  });

  it("debe aplicar sanitizeValue cuando se proporciona", async () => {
    const onChangeText = jest.fn();
    const sanitizeValue = jest.fn((value: string) => value.toUpperCase());

    await render(
      <TestFormWrapper
        onChangeText={onChangeText}
        sanitizeValue={sanitizeValue}
      />,
    );

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "juan");

    expect(sanitizeValue).toHaveBeenCalledWith("juan");
    expect(onChangeText).toHaveBeenCalledWith("JUAN");
  });

  it("debe manejar sanitizeValue que retorna número", async () => {
    const onChangeText = jest.fn();
    const sanitizeValue = jest.fn(
      (value: string) => value.length as number | undefined,
    );

    await render(
      <TestFormWrapper
        onChangeText={onChangeText}
        sanitizeValue={sanitizeValue}
      />,
    );

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "Juan");

    expect(onChangeText).toHaveBeenCalledWith("4");
  });

  it("debe tener propiedades de accesibilidad", async () => {
    await render(<TestFormWrapper />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    expect(input.props.accessible).toBe(true);
    expect(input.props.accessibilityRole).toBe("adjustable");
    expect(input.props.accessibilityLabel).toBe("Nombre Completo");
  });

  it("debe tener accessibilityHint correcto", async () => {
    await render(<TestFormWrapper />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    expect(input.props.accessibilityHint).toContain("nombre completo");
  });

  it("debe manejar múltiples cambios de texto", async () => {
    const onChangeText = jest.fn();
    await render(<TestFormWrapper onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "J");
    await fireEvent.changeText(input, "Ju");
    await fireEvent.changeText(input, "Juan");

    expect(onChangeText).toHaveBeenCalledTimes(3);
    expect(onChangeText).toHaveBeenLastCalledWith("Juan");
  });

  it("debe manejar texto vacío", async () => {
    const onChangeText = jest.fn();
    await render(<TestFormWrapper onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "");

    expect(onChangeText).toHaveBeenCalledWith("");
  });

  it("debe manejar caracteres especiales", async () => {
    const onChangeText = jest.fn();
    await render(<TestFormWrapper onChangeText={onChangeText} />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "José María Gutiérrez-López");

    expect(onChangeText).toHaveBeenCalledWith("José María Gutiérrez-López");
  });

  it("debe aceptar props adicionales de TextInput", async () => {
    const TestWrapper = () => {
      const { control } = useForm<TestFormData>({
        defaultValues: { fullName: "", email: "", age: "" },
      });
      return (
        <FormInput<TestFormData>
          control={control}
          name="email"
          label="Email"
          placeholder="tu@email.com"
          editable={false}
          maxLength={50}
        />
      );
    };

    const { queryByPlaceholderText } = await render(<TestWrapper />);

    const input = queryByPlaceholderText("tu@email.com");
    expect(input?.props.editable).toBe(false);
    expect(input?.props.maxLength).toBe(50);
  });

  it("debe no llamar a onChangeText si no se proporciona", async () => {
    await render(<TestFormWrapper />);

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    await fireEvent.changeText(input, "Prueba");

    expect(input).toBeTruthy();
  });

  it("debe manejar sanitizeValue que retorna undefined", async () => {
    const onChangeText = jest.fn();
    const sanitizeValue = jest.fn((value: string) =>
      value === "" ? undefined : value,
    );

    await render(
      <TestFormWrapper
        onChangeText={onChangeText}
        sanitizeValue={sanitizeValue}
      />,
    );

    const input = screen.getByPlaceholderText("Ingrese su nombre");
    fireEvent.changeText(input, "");

    expect(onChangeText).toHaveBeenCalledWith("");
  });
});

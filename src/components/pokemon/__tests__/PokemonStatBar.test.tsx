import { render, screen } from "@testing-library/react-native";
import { PokemonStatBar } from "../PokemonStatBar";

describe("PokemonStatBar", () => {
  it("debe renderizar correctamente con props básicas", async () => {
    await render(<PokemonStatBar label="HP" value={50} />);

    expect(screen.getByText("HP")).toBeTruthy();
    expect(screen.getByText("50")).toBeTruthy();
  });

  it("debe usar color personalizado cuando se proporciona", async () => {
    await render(<PokemonStatBar label="Attack" value={75} color="#FF5722" />);

    const attackText = screen.getByText("Attack");
    expect(attackText).toBeTruthy();
    expect(screen.getByText("75")).toBeTruthy();
  });

  it("debe limitar el porcentaje al 100% para valores superiores a 100", async () => {
    await render(<PokemonStatBar label="HP" value={255} />);

    const bar = (screen.getByText("255").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.width).toBe("100%");
  });

  it("debe calcular correctamente el porcentaje para valores menores a 100", async () => {
    await render(<PokemonStatBar label="Speed" value={60} />);

    const bar = (screen.getByText("60").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.width).toBe("60%");
  });

  it("debe mostrar valor 0 cuando se proporciona", async () => {
    await render(<PokemonStatBar label="Attack" value={0} />);

    const bar = (screen.getByText("0").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.width).toBe("0%");
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("debe mostrar valor 100 cuando se proporciona", async () => {
    await render(<PokemonStatBar label="Defense" value={100} />);

    const bar = (screen.getByText("100").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.width).toBe("100%");
  });

  it("debe aplicar el color correcto a la barra", async () => {
    const customColor = "#E91E63";
    await render(<PokemonStatBar label="Sp. Atk" value={80} color={customColor} />);

    const bar = (screen.getByText("80").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.backgroundColor).toBe(customColor);
  });

  it("debe renderizar correctamente con diferentes estadísticas", async () => {
    const stats = [
      { label: "HP", value: 100 },
      { label: "Attack", value: 110 },
      { label: "Defense", value: 90 },
      { label: "Sp. Atk", value: 120 },
      { label: "Sp. Def", value: 95 },
      { label: "Speed", value: 85 },
    ];

    for (const { label, value } of stats) {
      await render(<PokemonStatBar label={label} value={value} />);
      expect(screen.getByText(label)).toBeTruthy();
      expect(screen.getByText(value.toString())).toBeTruthy();
    }
  });

  it("debe manejar valores decimales correctamente", async () => {
    await render(<PokemonStatBar label="Stat" value={75.5} />);

    const bar = (screen.getByText("75.5").parent as any)?.parent?.children?.[1]
      ?.children?.[0];
    expect((bar as any)?.props?.style?.[1]?.width).toBe("75.5%");
  });
});

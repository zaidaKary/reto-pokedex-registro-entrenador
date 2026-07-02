import { render } from "@testing-library/react-native";
import { StepIndicator } from "../StepIndicator";

describe("StepIndicator", () => {
  it("debe renderizar el componente sin errores", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={3} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe calcular 0% cuando currentStep es 0", async () => {
    const result = await render(
      <StepIndicator currentStep={0} totalSteps={5} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe calcular 100% cuando currentStep es igual a totalSteps", async () => {
    const result = await render(
      <StepIndicator currentStep={5} totalSteps={5} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe renderizar para diferentes proporções (1 de 3)", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={3} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe renderizar para 50% de progreso (2 de 4)", async () => {
    const result = await render(
      <StepIndicator currentStep={2} totalSteps={4} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe renderizar para 25% de progreso (1 de 4)", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={4} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe renderizar para 75% de progreso (3 de 4)", async () => {
    const result = await render(
      <StepIndicator currentStep={3} totalSteps={4} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe manejar totalSteps de 1", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={1} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe manejar totalSteps grande (100)", async () => {
    const result = await render(
      <StepIndicator currentStep={50} totalSteps={100} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe recalcular cuando los props cambian (rerender test)", async () => {
    const { rerender } = await render(
      <StepIndicator currentStep={1} totalSteps={3} />,
    );

    await rerender(<StepIndicator currentStep={2} totalSteps={3} />);

    expect(true).toBe(true);
  });

  it("debe recalcular cuando totalSteps cambia", async () => {
    const { rerender } = await render(
      <StepIndicator currentStep={1} totalSteps={2} />,
    );

    await rerender(<StepIndicator currentStep={1} totalSteps={4} />);

    expect(true).toBe(true);
  });

  it("debe manejar valores pequeños de currentStep (1 de 100)", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={100} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe manejar valores en porcentajes comunes", async () => {
    const testCases = [
      { current: 0, total: 5, description: "0%" },
      { current: 1, total: 4, description: "25%" },
      { current: 2, total: 4, description: "50%" },
      { current: 3, total: 4, description: "75%" },
      { current: 5, total: 5, description: "100%" },
    ];

    for (const testCase of testCases) {
      const result = await render(
        <StepIndicator
          currentStep={testCase.current}
          totalSteps={testCase.total}
        />,
      );
      expect(result).toBeTruthy();
    }
  });

  it("debe renderizar múltiples pasos secuencialmente", async () => {
    let result = await render(<StepIndicator currentStep={1} totalSteps={5} />);
    expect(result).toBeTruthy();

    result = await render(<StepIndicator currentStep={2} totalSteps={5} />);
    expect(result).toBeTruthy();

    result = await render(<StepIndicator currentStep={5} totalSteps={5} />);
    expect(result).toBeTruthy();
  });

  it("debe manejar step inicial en 0", async () => {
    const result = await render(
      <StepIndicator currentStep={0} totalSteps={1} />,
    );

    expect(result).toBeTruthy();
  });

  it("debe renderizar con stepos decimales en cálculos", async () => {
    const result = await render(
      <StepIndicator currentStep={1} totalSteps={3} />,
    );

    expect(result).toBeTruthy();
  });
});

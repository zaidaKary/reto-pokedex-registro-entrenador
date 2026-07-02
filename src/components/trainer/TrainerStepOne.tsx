import { Ionicons } from "@expo/vector-icons";
import { useFormContext } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FormInput } from "./FormInput";
import { Trainer } from "../../types/trainer";

export function TrainerStepOne({ onNext }: { onNext: () => void }) {
  const { control, trigger } = useFormContext<Trainer>();

  async function handleNext() {
    const valid = await trigger(["fullName", "age", "email"]);
    if (valid) {
      onNext();
    }
  }

  return (
    <View>
      <View style={styles.titleRow}>
        <Ionicons name="person-outline" size={26} color="#1A1A1A" />
        <Text style={styles.subtitle}>Datos Personales</Text>
      </View>
      <Text style={styles.description}>Cuéntanos un poco sobre ti.</Text>
      <FormInput
        control={control}
        name="fullName"
        label="Nombre completo"
        placeholder="Ingrese su nombre"
        sanitizeValue={(value) =>
          value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, "")
        }
      />
      <FormInput
        control={control}
        name="age"
        label="Edad"
        placeholder="Ingrese su edad"
        keyboardType="number-pad"
        inputMode="numeric"
        sanitizeValue={(value) => {
          const digitsOnly = value.replace(/\D/g, "");
          return digitsOnly;
        }}
      />
      <FormInput
        control={control}
        name="email"
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Continuar al siguiente paso"
        accessibilityHint="Valida y continúa con la siguiente sección del formulario"
        style={styles.button}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 28,
  },

  button: {
    backgroundColor: "#E3350D",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

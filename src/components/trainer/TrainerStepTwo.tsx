import { Ionicons } from "@expo/vector-icons";
import { useFormContext } from "react-hook-form";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { DISTRICTS, POKEMON_TYPES } from "../../constants/trainer";
import { useTrainerStore } from "../../store/trainer.store";
import { Trainer } from "../../types/trainer";
import { FormSelect } from "./FormSelect";

export function TrainerStepTwo({
  onBack,
  onFinish,
}: {
  onBack: () => void;
  onFinish: () => void;
}) {
  const { control, handleSubmit } = useFormContext<Trainer>();
  const saveTrainer = useTrainerStore((state) => state.saveTrainer);

  function onSubmit(data: Trainer) {
    saveTrainer(data);
    Alert.alert(
      "¡Registro exitoso!",
      "Tu tarjeta de entrenador ha sido creada."
    );
    onFinish();
  }

  return (
    <View>
      <View style={styles.titleRow}>
        <Ionicons name="options-outline" size={26} color="#1A1A1A" />
        <Text style={styles.subtitle}>Preferencias</Text>
      </View>
      <FormSelect
        control={control}
        name="district"
        label="Distrito de origen"
        options={DISTRICTS}
      />
      <FormSelect
        control={control}
        name="favoriteType"
        label="Tipo de Pokémon favorito"
        options={POKEMON_TYPES}
      />
      <View style={styles.buttons}>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Atrás"
          accessibilityHint="Regresa al paso anterior"
          style={[styles.button, styles.secondaryButton]}
          onPress={onBack}
        >
          <Text style={styles.secondaryText}>Atrás</Text>
        </Pressable>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Guardar y completar registro"
          accessibilityHint="Guarda tus datos de entrenador"
          style={[styles.button, styles.primaryButton]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.primaryText}>Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 28,
  },

  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryButton: {
    backgroundColor: "#EEE",
    marginRight: 10,
  },

  primaryButton: {
    backgroundColor: "#E3350D",
    marginLeft: 10,
  },

  secondaryText: {
    fontWeight: "600",
    color: "#333",
  },

  primaryText: {
    color: "#FFF",
    fontWeight: "700",
  },
});

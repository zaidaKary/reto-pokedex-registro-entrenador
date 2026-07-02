import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormSelectProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <Pressable
            style={[styles.input, error && styles.inputError]}
            onPress={() => setVisible(true)}
          >
            <Text
              style={{
                color: value ? "#000" : "#999",
              }}
            >
              {value || "Seleccionar"}
            </Text>
          </Pressable>
          {error && <Text style={styles.error}>{error.message}</Text>}
          <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
              <View style={styles.modal}>
                {options.map((option) => (
                  <Pressable
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    accessibilityHint={`Selecciona ${label.toLowerCase()}. Seleccionado: ${value || "ninguno"}`}
                    accessibilityState={{ expanded: visible }}
                    key={option.value}
                    style={styles.option}
                    onPress={() => {
                      onChange(option.value);
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option.label}</Text>
                  </Pressable>
                ))}
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFF",
  },

  inputError: {
    borderColor: "#E53935",
  },

  error: {
    color: "#E53935",
    marginTop: 6,
    fontSize: 13,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },

  modal: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
  },

  option: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  optionText: {
    fontSize: 16,
  },

  cancelButton: {
    padding: 18,
    alignItems: "center",
  },

  cancelText: {
    color: "#E53935",
    fontWeight: "600",
  },
});

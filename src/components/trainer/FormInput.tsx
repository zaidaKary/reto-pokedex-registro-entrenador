import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface FormInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  sanitizeValue?: (value: string) => string | number | undefined;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  sanitizeValue,
  onChangeText,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            accessible={true}
            accessibilityRole="adjustable"
            accessibilityLabel={label}
            accessibilityHint={`Campo para ingresar ${label.toLowerCase()}`}
            value={value === undefined || value === null ? "" : String(value)}
            onChangeText={(text) => {
              const nextValue = sanitizeValue ? sanitizeValue(text) : text;

              onChange(nextValue);
              onChangeText?.(nextValue?.toString() ?? "");
            }}
            onBlur={onBlur}
            style={[styles.input, error && styles.inputError]}
            placeholderTextColor="#999"
            {...props}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
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
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#FFF",
  },

  inputError: {
    borderColor: "#E53935",
  },

  error: {
    marginTop: 6,
    color: "#E53935",
    fontSize: 13,
  },
});

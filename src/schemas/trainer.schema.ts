import * as yup from "yup";

export const trainerSchema = yup.object({
  fullName: yup
    .string()
    .required("El nombre es obligatorio.")
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
      "El nombre solo debe contener letras.",
    ),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value,
    )
    .typeError("Ingrese una edad válida.")
    .integer("La edad debe ser un número entero.")
    .required("La edad es obligatoria.")
    .min(11, "Debe ser mayor de 10 años."),
  email: yup
    .string()
    .email("Correo inválido.")
    .required("El correo es obligatorio.")
    .max(254, "El correo es demasiado largo."),
  district: yup.string().required("El distrito es obligatorio."),
  favoriteType: yup.string().required("El tipo favorito es obligatorio."),
});

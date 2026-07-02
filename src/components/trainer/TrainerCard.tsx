import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PokemonTypeBadge } from "../pokemon/PokemonTypeBadge";
import { typeEmoji } from "../../constants/pokemon";
import { useTrainerStore } from "../../store/trainer.store";
import { InfoRowProps } from "../../types/trainer";
import { mapFavoriteType } from "../../utils/trainer";

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color="#E3350D" />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

export function TrainerCard() {
  const trainer = useTrainerStore((state) => state.trainer);
  const clearTrainer = useTrainerStore((state) => state.clearTrainer);

  if (!trainer) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Ionicons name="id-card-outline" size={22} color="#E3350D" />
          <Text style={styles.header}>Tarjeta de entrenador</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {trainer.fullName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{trainer.fullName}</Text>
        <Text style={styles.subtitle}>Entrenador Pokémon</Text>
        <View style={styles.divider} />
        <InfoRow icon="mail" label="CORREO ELECTRÓNICO" value={trainer.email} />
        <InfoRow icon="gift" label="EDAD" value={`${trainer.age} años`} />
        <InfoRow icon="location" label="DISTRITO" value={trainer.district} />
        <View style={styles.divider} />
        <Text style={styles.favorite}>Tipo Favorito</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.favoriteEmoji}>
            {typeEmoji[trainer.favoriteType]}
          </Text>
          <PokemonTypeBadge type={mapFavoriteType(trainer.favoriteType)} />
        </View>
        <Text style={styles.footer}>#POKEDEX</Text>
      </View>
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Registrar nuevamente"
        accessibilityHint="Limpia el registro actual y comienza de nuevo"
        style={styles.button}
        onPress={clearTrainer}
      >
        <Text style={styles.buttonText}>Registrar nuevamente</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  header: {
    textAlign: "center",
    color: "#E3350D",
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 2,
  },

  avatar: {
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E3350D",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  avatarText: {
    color: "#FFF",
    fontSize: 38,
    fontWeight: "bold",
  },

  name: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: 6,
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF3F1",
    justifyContent: "center",
    alignItems: "center",
  },

  rowContent: {
    flex: 1,
  },

  rowLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  rowValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  favorite: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 16,
    fontSize: 18,
  },

  badgeContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 1,
  },

  footer: {
    marginTop: 26,
    textAlign: "center",
    color: "#AAA",
    letterSpacing: 2,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#E3350D",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
  },

  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  favoriteEmoji: {
    fontSize: 20,
  },
});

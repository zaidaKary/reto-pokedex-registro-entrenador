export function mapFavoriteType(type: string) {
  switch (type) {
    case "Fuego":
      return "fire";
    case "Agua":
      return "water";
    case "Planta":
      return "grass";
    default:
      return "normal";
  }
}

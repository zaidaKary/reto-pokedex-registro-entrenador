import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonDetailScreen } from "../screens/pokedex/PokemonDetailScreen";
import { PokemonListScreen } from "../screens/pokedex/PokemonListScreen";
import { PokedexStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<PokedexStackParamList>();

export function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{
          title: "Pokédex",
        }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{
          title: "Detalle",
        }}
      />
    </Stack.Navigator>
  );
}

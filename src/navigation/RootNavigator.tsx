import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { RootTabParamList } from "../types/navigation";
import { PokedexStack } from "./PokedexStack";
import { TrainerStack } from "./TrainerStack";

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === "Pokedex") {
              iconName = focused ? "book" : "book-outline";
            } else {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Pokedex" component={PokedexStack} />
        <Tab.Screen name="Trainer" component={TrainerStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

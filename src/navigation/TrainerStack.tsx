import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TrainerScreen } from "../screens/trainer/TrainerScreen";
import { TrainerStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<TrainerStackParamList>();

export function TrainerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trainer"
        component={TrainerScreen}
        options={{
          title: "Registro",
        }}
      />
    </Stack.Navigator>
  );
}

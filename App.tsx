import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/screens/Home";
import Login from "@/screens/Login";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkThemeCustom } from "@/types/DarkThemeCustom";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const colorScheme = useColorScheme();

  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={DarkThemeCustom}>
      <MyStack />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/screens/Home";
import Login from "@/screens/Login";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkThemeCustom } from "@/types/DarkThemeCustom";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calendar from "@/screens/Calendar";
import Notifications from "@/screens/Notifications";
import Settings from "@/screens/Settings";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function App() {
  const colorScheme = useColorScheme();

  const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: "To-Do",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="checklist" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            title: "Calendario",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="calendar" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: "Notificaciones",
            tabBarIcon: ({ color }) => (
              <IconSymbol name="bell.fill" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Ajustes",
            tabBarIcon: ({ color }) => <IconSymbol name="gear" color={color} />,
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={{ headerShown: false }}
        />
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

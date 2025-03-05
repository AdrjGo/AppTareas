import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/screens/principal/Todo";
import Login from "@/screens/principal/Login";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkThemeCustom } from "@/types/DarkThemeCustom";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Calendar from "@/screens/principal/Calendar";
import Notifications from "@/screens/principal/Notifications";
import Settings from "@/screens/principal/Settings";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ButtonOpacity from "@/components/common/buttons/ButtonOpacity";
import { addList } from "@/services/firebaseList";
import { Alert } from "react-native";
import TaskList from "@/screens/TaskList";
import ModalAddTask from "@/screens/ModalAddTask";
// import ModalScreen from "@/screens/AddList";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "To-Do",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="checklist" color={color} />
          ),
          headerRight: () => (
            <ButtonOpacity
              className={"mr-4"}
              onPress={() => {
                addList(), Alert.alert("Lista creada");
              }}
            >
              <IconSymbol name="plus" color="white" style={{ fontSize: 25 }} />
            </ButtonOpacity>
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

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={DarkThemeCustom}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Group>
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
          <Stack.Screen
            name="List"
            component={TaskList}
            options={{ headerShown: true, headerBackTitle: "Atrás", headerTitle: "Lista" }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="ModalAddTask"
            component={ModalAddTask}
            options={{ title: "Añadir Tarea",
              headerBackTitle: "Lista",
             }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
    </NavigationContainer>
  );
}

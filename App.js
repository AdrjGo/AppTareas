import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css";

export default function App() {
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Text className="text-black">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

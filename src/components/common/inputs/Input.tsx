import React from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  label: string;
  isPassword?: boolean;
  onChangeTexto?: any;
  keyboardType?: any;
}

function Input({
  placeholder,
  label,
  isPassword,
  onChangeTexto,
  keyboardType,
}: Props) {
  return (
    <View className="my-3">
      <Text className="text-xl text-white">{label}</Text>
      <TextInput
        className="text-white border-2 border-dark-blue rounded-md text-xl px-3 py-2"
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry={isPassword}
        onChangeText={onChangeTexto}
        keyboardAppearance="dark"
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default Input;

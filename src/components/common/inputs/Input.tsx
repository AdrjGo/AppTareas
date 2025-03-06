import { twMerge } from "@/utils/twMerge";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  label: string;
  isPassword?: boolean;
  onChangeTexto?: any;
  keyboardType?: any;
  className?: any;
  value?: any;
  multiLine?: boolean;
  
}

function Input({
  placeholder,
  label,
  isPassword,
  onChangeTexto,
  keyboardType,
  className,
  value,
  multiLine,
}: Props) {
  return (
    <View className="my-3">
      <Text className={twMerge(`text-xl text-white ${className}`)}>
        {label}
      </Text>
      <TextInput
        className="text-white border-2 border-dark-blue rounded-md text-xl px-3 py-2"
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        secureTextEntry={isPassword}
        onChangeText={onChangeTexto}
        keyboardAppearance="dark"
        keyboardType={keyboardType}
        value={value}
        multiline={multiLine}
      />
    </View>
  );
}

export default Input;

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { twMerge } from "@/utils/twMerge";

interface Props {
  text: string;
  colorBg?: "negro" | "azulOscuro" | "verde" | "rojo" | "amarillo";
  onPress?: any;
  colorText?: "blanco" | "azulOscuro" | "verde" | "rojo" | "amarillo";
}

function ButtonOpacity({ text, colorBg, onPress, colorText }: Props) {
  const getColorText = () => {
    switch (colorText) {
      case "blanco":
        return "text-[#ffffff]";
      case "azulOscuro":
        return "text-[#103347]";
      case "verde":
        return "text-[#3ac867]";
      case "rojo":
        return "text-[#f43f]";
      case "amarillo":
        return "text-[#f5a623]";
      default:
        return "text-[#000000]";
    }
  };
  const getColorBg = () => {
    switch (colorBg) {
      case "negro":
        return "bg-[#000000]";
      case "azulOscuro":
        return "bg-[#103347]";
      case "verde":
        return "bg-[#3ac867]";
      case "rojo":
        return "bg-[#f43f]";
      case "amarillo":
        return "bg-[#f5a623]";
      default:
        return "bg-[#ffffff]";
    }
  };
  return (
    <View className="my-1">
      <TouchableOpacity
        onPress={onPress}
        className={twMerge("rounded-md py-3", getColorBg())}
      >
        <Text
          className={twMerge(
            "text-center text-xl font-semibold",
            getColorText()
          )}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ButtonOpacity;

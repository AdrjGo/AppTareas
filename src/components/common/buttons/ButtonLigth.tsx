import React from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { twMerge } from "@/utils/twMerge";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface Props {
  text: string;
  colorBg?: "negro" | "azulOscuro" | "verde" | "rojo" | "amarillo";
  onPress?: any;
  colorText?: "blanco" | "azulOscuro" | "verde" | "rojo" | "amarillo";
}

function ButtonLigth({ text, colorBg, onPress, colorText }: Props) {
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
        return "#000000";
      case "azulOscuro":
        return "#103347";
      case "verde":
        return "#3ac867";
      case "rojo":
        return "#f43f";
      case "amarillo":
        return "#f5a623";
      default:
        return "#ffffff";
    }
  };
  return (
    <View className="my-1">
      <TouchableHighlight
        onPress={onPress}
        underlayColor={getColorBg()}
        className="rounded-md py-3"
      >
        <Text
          className={twMerge(
            "text-center text-xl font-semibold",
            getColorText()
          )}
        >
          {text}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

export default ButtonLigth;

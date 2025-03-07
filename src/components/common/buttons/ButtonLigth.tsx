import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { twMerge } from "@/utils/twMerge";

interface Props {
  text?: string;
  colorBg?: "black" | "darkBlue" | "green" | "red" | "yellow" | "gray" | "zinc";
  onPress?: any;
  colorBgPress?:
    | "black"
    | "darkBlue"
    | "green"
    | "red"
    | "yellow"
    | "gray"
    | "zinc";
  colorText?: "blanco" | "darkBlue" | "green" | "red" | "yellow";
  children?: any;
  textAlign?: "left" | "center" | "right";
  textSize?: "big" | "medium" | "small";
  textFont?: "light" | "medium" | "bold";
  className?: any;
}

function ButtonLigth({
  text,
  colorBg,
  colorBgPress,
  onPress,
  colorText,
  children,
  textAlign,
  textSize,
  textFont,
  className,
}: Props) {
  const getColorText = () => {
    switch (colorText) {
      case "blanco":
        return "text-[#ffffff]";
      case "darkBlue":
        return "text-[#103347]";
      case "green":
        return "text-[#3ac867]";
      case "red":
        return "text-[#f43f]";
      case "yellow":
        return "text-[#f5a623]";
      default:
        return "text-[#000000]";
    }
  };

  const getColorBgPress = () => {
    switch (colorBgPress) {
      case "black":
        return "black";
      case "darkBlue":
        return "#103347";
      case "green":
        return "#3ac867";
      case "red":
        return "#f43f";
      case "yellow":
        return "#f5a623";
      case "gray":
        return "#2c2c2e";
      case "zinc":
        return "#777777";
      default:
        return "white";
    }
  };

  const getColorBg = () => {
    switch (colorBg) {
      case "black":
        return "bg-[#000000]";
      case "darkBlue":
        return "bg-[#103347]";
      case "green":
        return "bg-[#3ac867]";
      case "red":
        return "bg-[#f43f]";
      case "yellow":
        return "bg-[#f5a623]";
      case "gray":
        return "bg-gray-common";
      case "zinc":
        return "bg-zinc-800";
      default:
        return "bg-transparent";
    }
  };

  const getTextAlign = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getTextSize = () => {
    switch (textSize) {
      case "big":
        return "text-2xl";
      case "medium":
        return "text-xl";
      case "small":
        return "text-base";
      default:
        return "text-lg";
    }
  };

  const getTextFont = () => {
    switch (textFont) {
      case "light":
        return "font-light";
      case "medium":
        return "font-medium";
      case "bold":
        return "font-bold";
      default:
        return "font-normal";
    }
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={getColorBgPress()}
      className={twMerge(`rounded-md p-3 my-1 ${className}`, getColorBg())}
    >
      <Text
        className={twMerge(
          "",
          getColorText(),
          getTextAlign(),
          getTextSize(),
          getTextFont()
        )}
      >
        {text}
        {children}
      </Text>
    </TouchableHighlight>
  );
}

export default ButtonLigth;

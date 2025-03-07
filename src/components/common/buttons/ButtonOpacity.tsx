import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { twMerge } from "@/utils/twMerge";

interface Props {

  colorBg?:
    | "black"
    | "darkBlue"
    | "green"
    | "red"
    | "yellow"
    | "gray"
    | "white"
    | "blue";
  onPress?: any;
  colorText?: "blanco" | "darkBlue" | "green" | "red" | "yellow";
  children?: any;
  textAlign?: "left" | "center" | "right";
  textSize?: "big" | "medium" | "small";
  textFont?: "light" | "medium" | "bold";
  className?: any;
  classNameText?: any;
  rounded?: "big" | "medium" | "small";
}

function ButtonOpacity({

  colorBg,
  onPress,
  colorText,
  children,
  textAlign,
  textSize,
  textFont,
  className,
  classNameText,
  rounded,
}: Props) {
  const getColorText = () => {
    switch (colorText) {
      case "blanco":
        return "text-[#ffffff]";
      case "darkBlue":
        return "text-[#103347]";
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

  const getColorBg = () => {
    switch (colorBg) {
      case "black":
        return "bg-[#000000]";
      case "white":
        return "bg-white";
      case "darkBlue":
        return "bg-[#103347]";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-[#3ac867]";
      case "red":
        return "bg-[#f43f]";
      case "yellow":
        return "bg-[#f5a623]";
      case "gray":
        return "bg-gray-common";
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

  const getRounded = () => {
    switch (rounded) {
      case "big":
        return "rounded-lg";
      case "medium":
        return "rounded-md";
      case "small":
        return "rounded-sm";
      default:
        return "font-normal";
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className={twMerge(`p-3 ${className}`, getColorBg(), getRounded())}
      >
        <Text
          className={twMerge(
            `text-center ${classNameText}`,
            getColorText(),
            getTextAlign(),
            getTextSize(),
            getTextFont()
          )}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default ButtonOpacity;

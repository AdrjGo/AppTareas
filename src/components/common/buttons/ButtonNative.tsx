import React from "react";
import { Button } from "react-native";

interface Props {
  title: string;
  onPress?: any;
  colorText?: "danger" | "success" | "warning" | "save";
}

function ButtonNative({ title, onPress, colorText }: Props) {
  const getColorText = () => {
    switch (colorText) {
      case "danger":
        return "#f43f";
      case "success":
        return "#3ac867";
      case "warning":
        return "#f5a623";
      default:
        return "";
    }
  };

  return <Button title={title} onPress={onPress} color={getColorText()} />;
}

export default ButtonNative;

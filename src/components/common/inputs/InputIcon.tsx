import { IconSymbol } from "@/components/ui/IconSymbol";
import { twMerge } from "@/utils/twMerge";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  icon: any;
  className?: any;
  stylesView?: "search" | "formTask" | "formTaskTextArea";
  stylesInput?: "search" | "formTaskText" | "formTaskTextArea";
  multiLine?: boolean;
}

function InputIcon({
  placeholder,
  icon,
  className,
  stylesInput,
  stylesView,
  multiLine
}: Props) {
  const getStyleViewDefined = () => {
    switch (stylesView) {
      case "search":
        return "bg-gray-common p-2 rounded-xl gap-3";
      case "formTask":
        return "bg-zinc-800 justify-start p-3";
      case "formTaskTextArea":
        return "bg-zinc-800 justify-start items-start p-3 h-28";
    }
  };
  const getStyleInputDefined = () => {
    switch (stylesInput) {
      case "search":
        return "w-[90%]";
      case "formTaskText":
        return "w-[90%]";
      case "formTaskTextArea":
        return "w-[90%] h-full";
    }
  };

  return (
    <View
      className={twMerge(`flex-row gap-3 ${className}`, getStyleViewDefined())}
    >
      <IconSymbol name={icon} color="white" />
      <TextInput
        className={twMerge("text-white", getStyleInputDefined())}
        placeholder={placeholder}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        multiline={multiLine}
        keyboardAppearance="dark"
      ></TextInput>
    </View>
  );
}

export default InputIcon;

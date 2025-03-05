import { IconSymbol } from "@/components/ui/IconSymbol";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  icon: any;
}

function InputIcon({ placeholder, icon }: Props) {
  return (
    <View className=" bg-gray-common p-2 rounded-xl w-[90%] gap-3 flex-row items-center ">
      <IconSymbol name={icon} color="white" />
      <TextInput
        className="text-white"
        placeholder={placeholder}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
      ></TextInput>
    </View>
  );
}

export default InputIcon;

import { Platform } from "react-native";
type FontStyle = {
  fontFamily: string;
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};
interface NativeTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  fonts: {
    regular: FontStyle;
    medium: FontStyle;
    bold: FontStyle;
    heavy: FontStyle;
  };
}

export const DarkThemeCustom: NativeTheme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(14, 14, 14)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
  fonts: Platform.select({
    ios: {
      regular: {
        fontFamily: "System",
        fontWeight: "400",
      },
      medium: {
        fontFamily: "System",
        fontWeight: "500",
      },
      bold: {
        fontFamily: "System",
        fontWeight: "600",
      },
      heavy: {
        fontFamily: "System",
        fontWeight: "700",
      },
    },
    default: {
      regular: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "sans-serif-medium",
        fontWeight: "normal",
      },
      bold: {
        fontFamily: "sans-serif",
        fontWeight: "600",
      },
      heavy: {
        fontFamily: "sans-serif",
        fontWeight: "700",
      },
    },
  } as const satisfies Record<string, NativeTheme["fonts"]>),
};

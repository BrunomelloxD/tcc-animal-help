import React from "react";
import { useFonts } from "expo-font";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";

import Routes from "./routes/routes";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(['EventEmitter.removeListener'])
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}

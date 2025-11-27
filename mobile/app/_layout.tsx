import { AppProvider } from "@/src/context/authContext";
import { CcpsProvider } from "@/src/context/ccpsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  
  return (
    <CcpsProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppProvider>
    </CcpsProvider>
  );
}

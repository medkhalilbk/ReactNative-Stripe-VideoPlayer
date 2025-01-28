import { router, Slot, Stack } from "expo-router";
import * as eva from "@eva-design/eva";

import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

export default function HomeLayout() {
 
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack screenOptions={{
        headerShown:false
      }} />
      <Toast/>
    </ApplicationProvider>
  );
}

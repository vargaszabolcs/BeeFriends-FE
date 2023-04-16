import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import Navigation from "./src/navigation/rootStack";
import { store } from "./src/store/store";

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <Navigation />
                <StatusBar />
            </Provider>
        </SafeAreaProvider>
    );
}

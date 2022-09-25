import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

import Navigation from "./src/navigation";
import { Provider } from "react-redux";

import store from "./src/store/store";

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

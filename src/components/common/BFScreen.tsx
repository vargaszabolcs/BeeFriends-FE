import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

interface IBFScreenProps {
    children: React.ReactNode;
    hasNoHeader?: boolean;
    isPartOfTabNav?: boolean;
    applyPadding?: boolean;
    style?: StyleProp<ViewStyle>;
}

const BFScreen: React.FC<IBFScreenProps> = ({
    children,
    hasNoHeader,
    isPartOfTabNav,
    applyPadding,
    style,
}) => {
    const edges: Edge[] = ["left", "right"];

    if (hasNoHeader) {
        edges.push("top");
    }
    if (!isPartOfTabNav) {
        edges.push("bottom");
    }
    return (
        <SafeAreaView
            style={[styles.container, applyPadding && { padding: 20 }, style]}
            edges={edges}
        >
            {children}
        </SafeAreaView>
    );
};

export default BFScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

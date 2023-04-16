import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import BFButton from "../components/common/BFButton";
import BFInputField from "../components/common/BFInputField";
import BFScreen from "../components/common/BFScreen";
import BFTitle from "../components/common/BFTitle";
import { AuthStackParamList } from "../types";

type ForgotPasswordProps = NativeStackScreenProps<AuthStackParamList, "ForgotPassword1">;

const ForgotPasswordScreen1: React.FC<ForgotPasswordProps> = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleNext = () => {
        // validate email and navigate to next screen
        if (email) {
            navigation.replace("ForgotPassword2");
        }
    };

    return (
        <BFScreen applyPadding>
            <BFTitle title={"Forgot Password"} />
            <Text style={styles.instructions}>Enter the email associated with your account</Text>
            <BFInputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                type="email"
                autoCapitalize="none"
                style={styles.input}
            />
            <BFButton
                onPress={handleNext}
                style={styles.button}
                title={"Next"}
            />
        </BFScreen>
    );
};

export default ForgotPasswordScreen1;

const styles = StyleSheet.create({
    instructions: {
        fontSize: 18,
        marginTop: 10,
    },
    input: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});

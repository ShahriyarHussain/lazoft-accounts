import {Stack} from "expo-router";
import "./global.css";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {
    return <Stack>
        <StatusBar style="dark" />
        <Stack.Screen
            name="(tabs)"
            options={{headerShown: false}}
        />
    </Stack>;
}

import "../global.css"
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import PageTitle from "@/app/components/page_title";

export default function App() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
                <PageTitle title="Home"/>
            </ScrollView>
        </SafeAreaView>
    );
}
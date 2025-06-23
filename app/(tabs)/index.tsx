import "../global.css"
import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import PageTitle from "@/app/components/page_title";

export default function App() {
    return (
        <View>
            <PageTitle title="Home"/>
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
                minHeight: "100%",
                paddingBottom: 10
            }}>
            </ScrollView>
        </View>
    );
}
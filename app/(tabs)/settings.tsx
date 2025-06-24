import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import PageTitle from "@/app/components/page_title";

const Settings = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
                <PageTitle title="Settings"/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Settings
const styles = StyleSheet.create({})

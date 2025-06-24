import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import PageTitle from "@/app/components/page_title";
import TransactionCard from "@/app/components/transaction_card";

const ManageAccounts = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
                <PageTitle title="Accounts"/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ManageAccounts
const styles = StyleSheet.create({})

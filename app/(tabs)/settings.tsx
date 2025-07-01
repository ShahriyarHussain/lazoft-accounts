import {Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import PageTitle from "@/app/components/page_title";
import {TransactionStorage} from '../helper/TransactionStorage';

const Settings = () => {

    const deleteAllTransactions = async () => {
        try {
            await TransactionStorage.deleteAllTransactions();
            Alert.alert('Success', 'All transactions have been deleted.');
        } catch (error) {
            console.error('Delete failed:', error);
            Alert.alert('Error', 'Unexpected error while deleting transactions.');
        }
    }

    const confirmDelete = () => {
        Alert.alert(
            'Delete All Transactions',
            'Are you sure you want to delete all transactions? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes, Delete',
                    onPress: deleteAllTransactions,
                    style: 'destructive',
                },
            ],
            {cancelable: true}
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="p-4">
                <PageTitle title="Settings"/>
            </View>

            <ScrollView className="flex-1 p-4">
                <TouchableOpacity
                    onPress={confirmDelete}
                    className="rounded-lg py-4 items-center bg-red-600"
                >
                    <Text className="text-white font-bold text-lg">
                        Delete All Transactions
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Settings
const styles = StyleSheet.create({})

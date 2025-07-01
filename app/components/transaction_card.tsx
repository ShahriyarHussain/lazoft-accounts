import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {TransactionStorage} from "@/app/helper/TransactionStorage";

const TransactionCard = ({id, amount, date, title, type}: any) => {
    const handleLongPress = () => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                {text: 'Cancel', style: 'cancel'},
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await TransactionStorage.deleteTransaction(id);
                        Alert.alert('Success', 'Transaction Deleted');
                    },
                },
            ]
        );
    };
    return (
        <TouchableOpacity onLongPress={handleLongPress}>
            <View
                className={`flex-row rounded-xl justify-between items-center p-4 m-1 ${type === 'income' ? 'bg-emerald-900' : 'bg-rose-800'}`}>
                <View className="flex rounded-xl justify-start items-start">
                    <Text className="text-white font-semibold text-lg flex-1" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-gray-200 text-sm flex-1" numberOfLines={1}>
                        {date}
                    </Text>
                </View>
                <Text className="text-white font-bold text-2xl" numberOfLines={1}>
                    ৳ {amount}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
export default TransactionCard
const styles = StyleSheet.create({})

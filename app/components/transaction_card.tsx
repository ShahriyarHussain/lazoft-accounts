import {Image, ImageBase, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";

const TransactionCard = ({amount, date, title, type} : any) => {
    return (
        <TouchableOpacity>
            <View className={`flex-row rounded-xl justify-between items-center p-4 m-1 ${type === 'income' ? 'bg-emerald-900' : 'bg-rose-800'}`}>
                <View className="flex rounded-xl justify-start items-start">
                <Text className="text-white font-semibold text-lg flex-1" numberOfLines={1}>
                    {title}
                </Text>
                    <Text className="text-gray-200 text-sm flex-1" numberOfLines={1}>
                        {date}
                    </Text>
                </View>
                <Text className="text-white font-bold text-xl" numberOfLines={1}>
                    BDT {amount}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
export default TransactionCard
const styles = StyleSheet.create({})

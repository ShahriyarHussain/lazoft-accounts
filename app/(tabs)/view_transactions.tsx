import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import PageTitle from "@/app/components/page_title";
import TransactionCard from "@/app/components/transaction_card";
import {TransactionStorage} from "@/app/helper/TransactionStorage";
// eslint-disable-next-line import/no-duplicates
import {FlatList} from 'react-native';


const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await TransactionStorage.getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const renderTransaction = ({item}) => (
        <TransactionCard
            amount={item.amount}
            date={item.date}
            title={item.title}
            type={item.type}
        />
    );

    if (loading) {
        return <ActivityIndicator size="large"/>;
    }


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <PageTitle title="View Transactions"/>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                showsVerticalScrollIndicator={false}
            />
            </View>
        </SafeAreaView>

    )
}
export default ViewTransactions
StyleSheet.create({});
import "../global.css"
import {ActivityIndicator, Animated, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router";
import PageTitle from "@/app/components/page_title";
import {useFocusEffect} from "@react-navigation/native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {TransactionStorage} from "@/app/helper/TransactionStorage";
import {StatusBar} from "expo-status-bar";

export default function App() {

    const [transactions, setTransactions] = useState([{
        id: '',
        title: '',
        date: '',
        amount: '',
        type: 'expense',
        category: '',
        paymentMethod: ''
    }]);
    const [filteredTransactions, setFilteredTransactions] = useState([{
        id: '',
        title: '',
        date: '',
        amount: '',
        type: 'expense',
        category: '',
        paymentMethod: ''
    }]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalFoodExpense, setTotalFoodExpense] = useState(0);
    const [totalEntertainmentExpense, setTotalEntertainmentExpense] = useState(0);
    const [totalBillExpense, setTotalBillExpense] = useState(0);
    const [totalCommuteExpense, setTotalCommuteExpense] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filterRange, setFilterRange] = useState(1);

    const calculateSummary = () => {
        let totalBalance = 0, totalIncome = 0, totalExpense = 0, totalFoodExpense = 0,
            totalBillExpense = 0, totalEntertainmentExpense = 0, totalCommuteExpense = 0;
        filteredTransactions.forEach((transaction: { id: string; amount: string; type: string; category: string }) => {
            const amount = parseFloat(transaction.amount);

            if (transaction.type === 'income') {
                totalBalance += amount;
                totalIncome += amount;
            } else {
                if (transaction.category === 'Food') {
                    totalFoodExpense += amount;
                } else if (transaction.category === 'Bill') {
                    totalBillExpense += amount;
                } else if (transaction.category === 'Entertainment') {
                    totalEntertainmentExpense += amount;
                } else if (transaction.category === 'Commute') {
                    totalCommuteExpense += amount;
                }
                totalBalance -= amount;
                totalExpense += amount;
            }
        });
        setTotalBalance(totalBalance);
        setTotalExpense(totalExpense);
        setTotalBillExpense(totalBillExpense);
        setTotalCommuteExpense(totalCommuteExpense);
        setTotalEntertainmentExpense(totalEntertainmentExpense);
        setTotalFoodExpense(totalFoodExpense);
        setTotalIncome(totalIncome);
    }

    useFocusEffect(
        useCallback(() => {
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
            fetchTransactions().then();
            calculateSummary();
        }, []));

    useEffect(() => {
        const now = new Date();
        const fromDate = new Date(now.getFullYear(), now.getMonth() - filterRange + 1, 1);

        if (filterRange === 0) {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter(tx => {
                const txDate = new Date(tx.date);
                return txDate >= fromDate;
            });
            setFilteredTransactions(filtered);
        }
    }, [filterRange, transactions]);

    const toggleFilter = () => {
        setFilterRange((filterRange + 1) % 4);
    };
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const animateTap = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start();
        toggleFilter()
    };

    useEffect(() => {
        calculateSummary()
    }, [filteredTransactions]);


    if (loading) {
        return <ActivityIndicator size="large"/>;
    }


    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="flex-1 p-4">
                <PageTitle title="Home"/>
                <View className="flex flex-row justify-end">
                    <Animated.Text
                        onPress={animateTap}
                        style={{transform: [{scale: scaleAnim}]}}
                        className="text-blue-600 font-semibold text-base mb-2"
                    >
                        {filterRange === 1 ? 'This Month' : (filterRange === 0 ? 'All' : filterRange + ' Months')}
                    </Animated.Text>
                </View>
                <ScrollView>
                    <View className="flex-row flex-wrap justify-between gap-3 p-4">
                        <View className="bg-primary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Transactions</Text>
                            <Text className="text-primary_light text-2xl font-bold">{filteredTransactions.length}</Text>
                        </View>
                        <View className="bg-primary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Total Amount</Text>
                            <Text className="text-primary_light text-2xl font-bold">৳ {totalBalance}</Text>
                        </View>
                        <View className="bg-red-800 w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Expense</Text>
                            <Text className="text-white text-2xl font-bold">৳ {totalExpense}</Text>
                        </View>
                        <View className="bg-green-800 w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Income</Text>
                            <Text className="text-white text-2xl font-bold">৳ {totalIncome}</Text>
                        </View>
                        <View className="bg-primary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Food Expense</Text>
                            <Text className="text-primary_light text-2xl font-bold">৳ {totalFoodExpense}</Text>
                        </View>
                        <View className="bg-primary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Bill Expense</Text>
                            <Text className="text-primary_light text-2xl font-bold">৳ {totalBillExpense}</Text>
                        </View>
                        <View className="bg-secondary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Entertainment Expense</Text>
                            <Text className="text-primary_light text-2xl font-bold">৳ {totalEntertainmentExpense}</Text>
                        </View>
                        <View className="bg-secondary w-40 p-3 rounded-lg mb-3">
                            <Text className="text-gray-200 text-base font-semibold mb-1">Commute</Text>
                            <Text className="text-primary_light text-2xl font-bold">৳ {totalCommuteExpense}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
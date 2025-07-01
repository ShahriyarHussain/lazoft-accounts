import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native'
import React, {useEffect, useState, useRef, useCallback} from 'react'
import PageTitle from "@/app/components/page_title";
import TransactionCard from "@/app/components/transaction_card";
import {TransactionStorage} from "@/app/helper/TransactionStorage";
import {useFocusEffect} from "@react-navigation/native";


const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([{
        id: '',
        title: '',
        date: '',
        amount: '',
        type: 'expense',
        category: '',
        paymentMethod: ''
    }]);
    const [transactionSum, setTransactionSum] = useState(0);
    const [filteredTransactions, setFilteredTransactions] = useState([{
        id: '',
        title: '',
        date: '',
        amount: '',
        type: 'expense',
        category: '',
        paymentMethod: ''
    }]);
    const [loading, setLoading] = useState(true);
    const [filterRange, setFilterRange] = useState(1);

    const renderTransaction = ({item}: { item: any }) => (
        <TransactionCard
            id={item.id}
            amount={item.amount}
            date={item.date}
            title={item.title}
            type={item.type}
        />);

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
        }, []));

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
        toggleFilter();
    };

    const toggleFilter = () => {
        setFilterRange((filterRange + 1) % 4);
    };
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
    useEffect(() => {
        const sum = filteredTransactions.reduce(
            (acc: number, cur: any) =>
                cur.type === "income"
                    ? acc + Number(cur.amount)
                    : acc - Number(cur.amount),
            0
        );
        setTransactionSum(sum);
    }, [filteredTransactions]);


    if (loading) {
        return <ActivityIndicator size="large"/>;
    }
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-4">
                <PageTitle title="View Transactions"/>
                <View className="flex flex-row justify-end">
                    <Animated.Text
                        onPress={animateTap}
                        style={{transform: [{scale: scaleAnim}]}}
                        className="text-blue-600 font-semibold text-base mb-2"
                    >
                        {filterRange === 1 ? 'This Month' : (filterRange === 0 ? 'All' : filterRange + ' Months')}
                    </Animated.Text>
                </View>
                <FlatList
                    data={filteredTransactions}
                    renderItem={renderTransaction}
                    keyExtractor={(item: any, index: number) =>
                        item.id?.toString() || index.toString()
                    }
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <Text
                            className={`font-bold text-2xl mt-4 ${transactionSum >= 0 ? 'text-green-800' : 'text-red-600'}`}
                        >
                            {filteredTransactions.length > 0 ? ("Sub-Total: " + transactionSum) : ""}
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>

    )
}
export default ViewTransactions
StyleSheet.create({});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TransactionStorage } from '@/app/helper/TransactionStorage'; // Adjust path as needed

const TransactionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        amount: '',
        type: 'expense',
        category: '',
        paymentMethod: ''
    });

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const transactionTypes = ['expense', 'income'];
    const expenseCategories = ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other'];
    const incomeCategories = ['Salary', 'Business', 'Investment', 'Gift', 'Other'];
    const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Mobile Banking', 'Other'];

    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const onDateChange = (event, date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (date) {
            setSelectedDate(date);
            handleInputChange('date', formatDate(date));
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!formData.title.trim()) {
            Alert.alert('Error', 'Please enter a transaction title');
            return;
        }
        if (!formData.amount.trim() || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount greater than 0');
            return;
        }
        if (!formData.date.trim()) {
            Alert.alert('Error', 'Please select a date');
            return;
        }
        if (!formData.category.trim()) {
            Alert.alert('Error', 'Please select a category');
            return;
        }
        if (!formData.paymentMethod.trim()) {
            Alert.alert('Error', 'Please select a payment method');
            return;
        }

        setIsLoading(true);

        try {
            // Save transaction to AsyncStorage
            const savedTransaction = await TransactionStorage.saveTransaction(formData);

            console.log('Transaction saved:', savedTransaction);

            // Show success message
            Alert.alert(
                'Success',
                `${formData.type === 'expense' ? 'Expense' : 'Income'} of BDT ${formData.amount} added successfully!`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Reset form after successful save
                            setFormData({
                                title: '',
                                date: '',
                                amount: '',
                                type: 'expense',
                                category: '',
                                paymentMethod: ''
                            });
                            setSelectedDate(new Date());
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error saving transaction:', error);
            Alert.alert('Error', 'Failed to save transaction. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderTransactionTypeButtons = () => {
        return (
            <View className="flex-row mb-4">
                {transactionTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        onPress={() => {
                            handleInputChange('type', type);
                            handleInputChange('category', ''); // Reset category when type changes
                        }}
                        className={`flex-1 mr-2 px-4 py-3 rounded-lg border ${
                            formData.type === type
                                ? type === 'expense'
                                    ? 'bg-red-500 border-red-500'
                                    : 'bg-green-500 border-green-500'
                                : 'bg-gray-100 border-gray-300'
                        }`}
                    >
                        <Text className={`text-center font-medium capitalize ${
                            formData.type === type ? 'text-white' : 'text-gray-700'
                        }`}>
                            {type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderDropdown = (options, selectedValue, onSelect, placeholder, showDropdown, setShowDropdown) => {
        return (
            <View className="relative mb-4">
                <TouchableOpacity
                    onPress={() => setShowDropdown(!showDropdown)}
                    className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
                >
                    <Text className={selectedValue ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedValue || placeholder}
                    </Text>
                    <Text className="text-gray-400 text-lg">
                        {showDropdown ? '▲' : '▼'}
                    </Text>
                </TouchableOpacity>

                {showDropdown && (
                    <View className="absolute top-14 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48">
                        <ScrollView>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => {
                                        onSelect(option);
                                        setShowDropdown(false);
                                    }}
                                    className="px-4 py-3 border-b border-gray-100"
                                >
                                    <Text className="text-gray-800">{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-2xl font-bold text-gray-800 mb-6">Add Transaction</Text>

                {/* Title Input */}
                <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">Transaction Title</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="Enter transaction title"
                        value={formData.title}
                        onChangeText={(value) => handleInputChange('title', value)}
                    />
                </View>

                {/* Date Input */}
                <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">Date</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
                    >
                        <Text className={formData.date ? 'text-gray-800' : 'text-gray-400'}>
                            {formData.date || 'Type Date (yyyy-MM-dd)'}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-end mt-2">
                        <TouchableOpacity
                            onPress={() => {
                                const today = new Date();
                                setSelectedDate(today);
                                handleInputChange('date', getCurrentDate());
                            }}
                        >
                            <Text className="text-cyan-950 font-medium">Use Today&#39;s Date</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Amount Input */}
                <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">Amount (BDT)</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChangeText={(value) => handleInputChange('amount', value)}
                        keyboardType="numeric"
                    />
                </View>

                {/* Transaction Type */}
                <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">Transaction Type</Text>
                    {renderTransactionTypeButtons()}
                </View>

                {/* Category */}
                <View className="mb-4">
                    <Text className="text-gray-700 font-medium mb-2">Category</Text>
                    {renderDropdown(
                        formData.type === 'expense' ? expenseCategories : incomeCategories,
                        formData.category,
                        (value) => handleInputChange('category', value),
                        'Select category',
                        showCategoryDropdown,
                        setShowCategoryDropdown
                    )}
                </View>

                {/* Payment Method */}
                <View className="mb-6">
                    <Text className="text-gray-700 font-medium mb-2">Payment Method</Text>
                    {renderDropdown(
                        paymentMethods,
                        formData.paymentMethod,
                        (value) => handleInputChange('paymentMethod', value),
                        'Select payment method',
                        showPaymentDropdown,
                        setShowPaymentDropdown
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`rounded-lg py-4 items-center ${
                        isLoading ? 'bg-gray-400' : 'bg-cyan-950'
                    }`}
                >
                    <Text className="text-white font-bold text-lg">
                        {isLoading ? 'Saving...' : 'Add Transaction'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionForm;
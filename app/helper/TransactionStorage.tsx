import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionStorage = {
    // Save a new transaction
    async saveTransaction(transaction) {
        try {
            // Generate unique ID using timestamp
            const id = Date.now().toString();
            const transactionWithId = {
                ...transaction,
                id,
                createdAt: new Date().toISOString()
            };

            // Get existing transactions
            const existingTransactions = await this.getTransactions();

            // Add new transaction to beginning of array (most recent first)
            const updatedTransactions = [transactionWithId, ...existingTransactions];

            // Save to storage
            await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));

            return transactionWithId;
        } catch (error) {
            console.error('Error saving transaction:', error);
            throw error;
        }
    },

    // Get all transactions
    async getTransactions() {
        try {
            const transactions = await AsyncStorage.getItem('transactions');
            return transactions ? JSON.parse(transactions) : [];
        } catch (error) {
            console.error('Error getting transactions:', error);
            return [];
        }
    },

    // Delete a transaction
    async deleteTransaction(id) {
        try {
            const transactions = await this.getTransactions();
            const filteredTransactions = transactions.filter(t => t.id !== id);
            await AsyncStorage.setItem('transactions', JSON.stringify(filteredTransactions));
            return true;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return false;
        }
    },

    // Get transactions by type
    async getTransactionsByType(type) {
        try {
            const transactions = await this.getTransactions();
            return transactions.filter(t => t.type === type);
        } catch (error) {
            console.error('Error filtering transactions:', error);
            return [];
        }
    },

    // Get total balance
    async getTotalBalance() {
        try {
            const transactions = await this.getTransactions();
            let balance = 0;

            transactions.forEach(transaction => {
                const amount = parseFloat(transaction.amount);
                if (transaction.type === 'income') {
                    balance += amount;
                } else {
                    balance -= amount;
                }
            });

            return balance;
        } catch (error) {
            console.error('Error calculating balance:', error);
            return 0;
        }
    }
};
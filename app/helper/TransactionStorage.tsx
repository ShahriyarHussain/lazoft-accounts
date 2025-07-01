import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransactionStorage = {
    async saveTransaction(transaction: {id: string; title: string; amount: string; type: string; date: string; category: string; paymentMethod : string  }) {
        try {
            const id = Date.now().toString();
            const transactionWithId = {
                ...transaction,
                id,
                createdAt: new Date().toISOString()
            };

            const existingTransactions = await this.getTransactions();
            const updatedTransactions = [transactionWithId, ...existingTransactions];

            await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
            return transactionWithId;
        } catch (error) {
            console.error('Error saving transaction:', error);
            throw error;
        }
    },

    async getTransactions() {
        try {
            const transactions = await AsyncStorage.getItem('transactions');
            return transactions ? JSON.parse(transactions) : [];
        } catch (error) {
            console.error('Error getting transactions:', error);
            return [];
        }
    },

    async deleteTransaction(id : string) {
        try {
            const transactions = await this.getTransactions();
            const filteredTransactions = transactions.filter((t: { id: string; }) => t.id !== id);
            await AsyncStorage.setItem('transactions', JSON.stringify(filteredTransactions));
            return true;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            return false;
        }
    },

    async getTransactionsByType(type : any) {
        try {
            const transactions = await this.getTransactions();
            return transactions.filter((t: { type: any; }) => t.type === type);
        } catch (error) {
            console.error('Error filtering transactions:', error);
            return [];
        }
    },

    async getTotalBalance() {
        try {
            const transactions = await this.getTransactions();
            let balance = 0;

            transactions.forEach((transaction: {id: string; amount: string; type: string; }) => {
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
    },

    async deleteAllTransactions () {
        try {
            await AsyncStorage.removeItem('transactions');
            console.log('All Transactions deleted');
            return true;
        } catch (error) {
            console.error('Failed to delete transactions:', error);
            return false;
        }
    }
};
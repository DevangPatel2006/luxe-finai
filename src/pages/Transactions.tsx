import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/DashboardLayout';

const transactions = [
  { id: 1, name: 'Salary Credit', category: 'Income', amount: 85000, date: '2025-11-01', type: 'credit' },
  { id: 2, name: 'Grocery Shopping', category: 'Food & Dining', amount: -3450, date: '2025-10-30', type: 'debit' },
  { id: 3, name: 'Electricity Bill', category: 'Bills & Utilities', amount: -2200, date: '2025-10-29', type: 'debit' },
  { id: 4, name: 'Freelance Project', category: 'Income', amount: 15000, date: '2025-10-28', type: 'credit' },
  { id: 5, name: 'Restaurant Dinner', category: 'Food & Dining', amount: -1850, date: '2025-10-27', type: 'debit' },
  { id: 6, name: 'Uber Ride', category: 'Transportation', amount: -450, date: '2025-10-26', type: 'debit' },
  { id: 7, name: 'Investment Returns', category: 'Income', amount: 8500, date: '2025-10-25', type: 'credit' },
  { id: 8, name: 'Shopping', category: 'Shopping', amount: -5600, date: '2025-10-24', type: 'debit' },
  { id: 9, name: 'Netflix Subscription', category: 'Entertainment', amount: -799, date: '2025-10-23', type: 'debit' },
  { id: 10, name: 'Gym Membership', category: 'Health & Fitness', amount: -2000, date: '2025-10-22', type: 'debit' },
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient-indigo">Transactions</span>
          </h1>
          <p className="text-muted-foreground">Track and manage all your transactions</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 hover:neon-border-indigo transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-muted-foreground">Total Income</p>
            </div>
            <p className="text-2xl font-bold text-accent">₹{totalIncome.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 hover:neon-border-indigo transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/10">
                <TrendingDown className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-muted-foreground">Total Expenses</p>
            </div>
            <p className="text-2xl font-bold text-secondary">₹{totalExpense.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 hover:neon-border-indigo transition-all duration-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Filter className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground">Net Savings</p>
            </div>
            <p className="text-2xl font-bold text-primary">₹{(totalIncome - totalExpense).toLocaleString()}</p>
          </motion.div>
        </div>

        {/* Search and Add */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-primary/20"
            />
          </div>
          <Link to="/add-transaction">
            <Button variant="luxury" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </Link>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all hover:neon-border-cyan duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    transaction.type === 'credit' ? 'bg-accent/10' : 'bg-secondary/10'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-5 h-5 text-accent" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-semibold ${
                  transaction.type === 'credit' ? 'text-accent' : 'text-foreground'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

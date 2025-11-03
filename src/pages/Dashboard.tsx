import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Target, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const stats = [
  { label: 'Total Balance', value: '₹2,45,670', change: '+12.5%', positive: true, icon: Wallet },
  { label: 'Monthly Income', value: '₹85,000', change: '+5.2%', positive: true, icon: TrendingUp },
  { label: 'Monthly Expenses', value: '₹52,550', change: '-8.3%', positive: true, icon: TrendingDown },
  { label: 'Savings Rate', value: '38%', change: '+3.1%', positive: true, icon: Target },
];

const recentTransactions = [
  { id: 1, name: 'Salary Credit', category: 'Income', amount: 85000, date: '2025-11-01', type: 'credit' },
  { id: 2, name: 'Grocery Shopping', category: 'Food', amount: -3450, date: '2025-10-30', type: 'debit' },
  { id: 3, name: 'Electricity Bill', category: 'Bills', amount: -2200, date: '2025-10-29', type: 'debit' },
  { id: 4, name: 'Freelance Project', category: 'Income', amount: 15000, date: '2025-10-28', type: 'credit' },
  { id: 5, name: 'Restaurant', category: 'Food', amount: -1850, date: '2025-10-27', type: 'debit' },
];

const goals = [
  { name: 'Emergency Fund', current: 45000, target: 100000, color: 'from-primary to-secondary' },
  { name: 'Vacation', current: 28000, target: 50000, color: 'from-accent to-primary' },
  { name: 'New Laptop', current: 62000, target: 80000, color: 'from-secondary to-violet' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-gradient-indigo">User</span>
          </h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:neon-border-indigo transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.positive ? 'text-accent' : 'text-destructive'
                  }`}>
                    {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
              <Link to="/transactions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-accent' : 'text-foreground'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Goals Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Goals</h2>
              <Link to="/add-goal">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <motion.div
                    key={goal.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${goal.color} rounded-full`}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

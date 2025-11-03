import { motion } from 'framer-motion';
import { Target, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const goals = [
  { 
    id: 1,
    name: 'Emergency Fund', 
    current: 45000, 
    target: 100000, 
    color: 'from-primary to-secondary',
    deadline: '2025-12-31',
    monthlyContribution: 5000,
  },
  { 
    id: 2,
    name: 'Dream Vacation to Europe', 
    current: 28000, 
    target: 50000, 
    color: 'from-accent to-primary',
    deadline: '2026-06-30',
    monthlyContribution: 3000,
  },
  { 
    id: 3,
    name: 'New Laptop', 
    current: 62000, 
    target: 80000, 
    color: 'from-secondary to-violet',
    deadline: '2025-12-15',
    monthlyContribution: 6000,
  },
  { 
    id: 4,
    name: 'Investment Portfolio', 
    current: 125000, 
    target: 500000, 
    color: 'from-violet to-accent',
    deadline: '2027-12-31',
    monthlyContribution: 10000,
  },
  { 
    id: 5,
    name: 'Home Down Payment', 
    current: 350000, 
    target: 1000000, 
    color: 'from-primary via-secondary to-accent',
    deadline: '2028-12-31',
    monthlyContribution: 15000,
  },
];

export default function Goals() {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Financial <span className="text-gradient-indigo">Goals</span>
          </h1>
          <p className="text-muted-foreground">Track your progress towards your dreams</p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 hover:neon-border-indigo transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Overall Progress</h2>
              <p className="text-muted-foreground">Combined progress across all goals</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gradient-indigo">{overallProgress.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">₹{totalSaved.toLocaleString()} / ₹{totalTarget.toLocaleString()}</p>
            </div>
          </div>
          <div className="relative h-4 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            />
          </div>
        </motion.div>

        {/* Add Goal Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/add-goal">
            <Button variant="luxury" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New Goal
            </Button>
          </Link>
        </motion.div>

        {/* Goals Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const monthsRemaining = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
            );
            const onTrack = (goal.target - goal.current) / monthsRemaining <= goal.monthlyContribution;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 hover:neon-border-cyan transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">Due: {goal.deadline}</p>
                    </div>
                  </div>
                  {onTrack ? (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      On Track
                    </div>
                  ) : (
                    <div className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                      Behind
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${goal.color} rounded-full`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">₹{goal.current.toLocaleString()}</span>
                    <span className="text-muted-foreground">₹{goal.target.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Contribution</span>
                    <span className="text-foreground font-medium">₹{goal.monthlyContribution.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="text-foreground font-medium">₹{(goal.target - goal.current).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time Left</span>
                    <span className="text-foreground font-medium">{monthsRemaining} months</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { z } from 'zod';

const goalSchema = z.object({
  name: z.string().trim().min(1, 'Goal name is required').max(100),
  targetAmount: z.number().positive('Target amount must be positive').max(100000000),
  currentAmount: z.number().min(0, 'Current amount cannot be negative').max(100000000),
  deadline: z.string().min(1, 'Deadline is required'),
  monthlyContribution: z.number().positive('Monthly contribution must be positive').max(10000000),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

export default function AddGoal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    monthlyContribution: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = goalSchema.parse({
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        deadline: formData.deadline,
        monthlyContribution: parseFloat(formData.monthlyContribution),
        description: formData.description,
      });

      toast({
        title: 'Goal Created!',
        description: `Your goal "${validatedData.name}" has been created successfully.`,
      });

      navigate('/goals');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const calculateMonthsNeeded = () => {
    const target = parseFloat(formData.targetAmount) || 0;
    const current = parseFloat(formData.currentAmount) || 0;
    const monthly = parseFloat(formData.monthlyContribution) || 0;
    
    if (monthly > 0 && target > current) {
      return Math.ceil((target - current) / monthly);
    }
    return 0;
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create <span className="text-gradient-indigo">Financial Goal</span>
          </h1>
          <p className="text-muted-foreground">Set your target and track your progress</p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 neon-border-indigo"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {formData.name || 'Your Goal Name'}
              </h3>
              <p className="text-sm text-muted-foreground">Preview</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Amount</span>
              <span className="text-foreground font-medium">
                ₹{parseFloat(formData.targetAmount || '0').toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly Contribution</span>
              <span className="text-foreground font-medium">
                ₹{parseFloat(formData.monthlyContribution || '0').toLocaleString()}
              </span>
            </div>
            {calculateMonthsNeeded() > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Time</span>
                <span className="text-accent font-medium">
                  {calculateMonthsNeeded()} months
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name</Label>
            <Input
              id="name"
              placeholder="e.g., Emergency Fund, Dream Vacation"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (₹)</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="100000"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className={errors.targetAmount ? 'border-destructive' : ''}
              />
              {errors.targetAmount && <p className="text-sm text-destructive">{errors.targetAmount}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount (₹)</Label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                className={errors.currentAmount ? 'border-destructive' : ''}
              />
              {errors.currentAmount && <p className="text-sm text-destructive">{errors.currentAmount}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className={errors.deadline ? 'border-destructive' : ''}
              />
              {errors.deadline && <p className="text-sm text-destructive">{errors.deadline}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution (₹)</Label>
              <Input
                id="monthlyContribution"
                type="number"
                step="0.01"
                placeholder="5000"
                value={formData.monthlyContribution}
                onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                className={errors.monthlyContribution ? 'border-destructive' : ''}
              />
              {errors.monthlyContribution && <p className="text-sm text-destructive">{errors.monthlyContribution}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Why is this goal important to you?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? 'border-destructive' : ''}
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="luxury" className="flex-1">
              Create Goal
            </Button>
          </div>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}

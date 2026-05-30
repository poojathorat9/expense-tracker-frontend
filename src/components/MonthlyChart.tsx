import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', expenses: 4000, income: 5000 },
  { month: 'Feb', expenses: 3000, income: 4500 },
  { month: 'Mar', expenses: 2800, income: 6000 },
  { month: 'Apr', expenses: 3900, income: 5200 },
  { month: 'May', expenses: 3500, income: 6500 },
];

export default function MonthlyChart() {
  return (
    <div className="chart-container">
      <div className="chart-title">Income vs Expenses</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend />
          <Bar dataKey="income" fill="#06b6d4" name="Income" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#8b5cf6" name="Expenses" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

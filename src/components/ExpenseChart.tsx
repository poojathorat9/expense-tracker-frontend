import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'];

const data = [
  { name: 'Food', value: 40 },
  { name: 'Travel', value: 20 },
  { name: 'Shopping', value: 25 },
  { name: 'Bills', value: 15 },
];

export default function ExpenseChart() {
  return (
    <div className="chart-container">
      <div className="chart-title">Expense Breakdown</div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

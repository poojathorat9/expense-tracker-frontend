interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

export default function RecentTransactions({ 
  transactions = [
    { id: '1', name: 'Lunch', category: 'Food', date: 'Today', amount: 300 },
    { id: '2', name: 'Petrol', category: 'Travel', date: 'Today', amount: 1000 },
  ] 
}: RecentTransactionsProps) {
  return (
    <div className="transactions-container">
      <div className="transactions-title">Recent Transactions</div>
      <div className="transactions-table">
        <div className="transactions-header">
          <div className="transactions-cell">Title</div>
          <div className="transactions-cell">Category</div>
          <div className="transactions-cell">Date</div>
          <div className="transactions-cell amount">Amount</div>
        </div>
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-row">
              <div className="transactions-cell">{transaction.name}</div>
              <div className="transactions-cell">{transaction.category}</div>
              <div className="transactions-cell">{transaction.date}</div>
              <div className="transactions-cell amount">₹{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

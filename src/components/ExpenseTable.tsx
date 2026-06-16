import { useMemo, useState } from 'react';
import '../styles/expense.css';
import { useExpenseContext } from '../context/ExpenseContext';

export default function ExpenseTable() {
  const { expenses, addExpense, deleteExpense } = useExpenseContext();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
  });

  const filteredTransactions = useMemo(
    () =>
      expenses.filter((transaction) =>
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase())
      ),
    [search, expenses]
  );

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setForm({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().slice(0, 10),
    });
  }

  function handleSave() {
    if (!form.title.trim() || !form.amount.trim()) return;

    addExpense({
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      amount: Number(form.amount.replace(/[^0-9.]/g, '')) || 0,
    });
    closeModal();
  }

  return (
    <div className="expenses-page">
      <div className="expenses-card">
        <div className="expenses-header">
          <div className="expenses-title">Expenses</div>
          <div className="expenses-actions">
            <input
              className="search-input"
              placeholder="Search expenses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button className="add-btn" onClick={openModal}>
              + Add Expense
            </button>
          </div>
        </div>

        <div className="expenses-table-wrap">
          <div className="table-separator" />
          <div className="table-headers">
            <div>Title</div>
            <div>Category</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Action</div>
          </div>
          <div className="table-separator" />

          <div className="table-body">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="table-row">
                <div className="cell">{transaction.title}</div>
                <div className="cell">{transaction.category}</div>
                <div className="cell">{transaction.date}</div>
                <div className="cell amount">₹{transaction.amount.toLocaleString()}</div>
                <div className="cell actions">
                  <button className="table-action-button" onClick={() => deleteExpense(transaction.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="table-separator" />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Expense</h3>
            </div>
            <div className="modal-form">
              <label className="modal-label">
                Title
                <input
                  className="modal-input"
                  value={form.title}
                  onChange={(event) => handleChange('title', event.target.value)}
                  placeholder="Enter title"
                />
              </label>

              <label className="modal-label">
                Amount
                <input
                  className="modal-input"
                  value={form.amount}
                  onChange={(event) => handleChange('amount', event.target.value)}
                  placeholder="Enter amount"
                />
              </label>

              <label className="modal-label">
                Category
                <select
                  className="modal-select"
                  value={form.category}
                  onChange={(event) => handleChange('category', event.target.value)}
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Fun">Fun</option>
                  <option value="Bills">Bills</option>
                  <option value="Shopping">Shopping</option>
                </select>
              </label>

              <label className="modal-label">
                Date
                <input
                  className="modal-input"
                  type="date"
                  value={form.date}
                  onChange={(event) => handleChange('date', event.target.value)}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="modal-button primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

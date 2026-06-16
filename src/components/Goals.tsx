import { useState } from 'react';
import '../styles/goals.css';
import { useGoalContext } from '../context/GoalContext';

const initialAccounts = [
  { id: 'checking', name: 'Checking Account', balance: 72000 },
  { id: 'savings', name: 'Savings Account', balance: 34000 },
  { id: 'cash', name: 'Cash Wallet', balance: 5000 },
];

export default function Goals() {
  const { goals, addGoal: addGoalContext, updateGoal: updateGoalContext, deleteGoal: deleteGoalContext, contributeToGoal: contributeToGoalContext } = useGoalContext();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('50000');
  const [goalDate, setGoalDate] = useState(new Date().toISOString().slice(0, 10));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [openGoalMenuId, setOpenGoalMenuId] = useState<number | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [contributeGoalId, setContributeGoalId] = useState<number | null>(null);
  const [contributeForm, setContributeForm] = useState({
    accountId: initialAccounts[0].id,
    amount: '1000',
  });
  const [editForm, setEditForm] = useState({
    title: '',
    current: '',
    target: '',
    targetDate: '',
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteGoalId, setDeleteGoalId] = useState<number | null>(null);

  function handleAddGoal() {
    const trimmed = goalName.trim();
    const targetValue = Number(goalTarget);
    if (!trimmed || Number.isNaN(targetValue) || targetValue <= 0) return;

    addGoalContext({
      title: trimmed,
      target: targetValue,
      targetDate: goalDate,
      current: 0,
    });
    setGoalName('');
    setGoalTarget('50000');
    setGoalDate(new Date().toISOString().slice(0, 10));
    setIsAddOpen(false);
  }

  function openEdit(goalId: number) {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) return;

    setOpenGoalMenuId(null);
    setEditingGoalId(goalId);
    setEditForm({
      title: goal.title,
      current: goal.current.toString(),
      target: goal.target.toString(),
      targetDate: goal.targetDate,
    });
    setIsEditOpen(true);
  }

  function openContribute(goalId: number) {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal) return;

    setOpenGoalMenuId(null);
    setContributeGoalId(goalId);
    setContributeForm({
      accountId: accounts[0].id,
      amount: '1000',
    });
    setIsContributeOpen(true);
  }

  function closeContribute() {
    setIsContributeOpen(false);
    setContributeGoalId(null);
  }

  function openAddGoal() {
    setGoalName('');
    setGoalTarget('50000');
    setGoalDate(new Date().toISOString().slice(0, 10));
    setIsAddOpen(true);
  }

  function closeAddGoal() {
    setIsAddOpen(false);
  }

  function closeEdit() {
    setIsEditOpen(false);
    setEditingGoalId(null);
    setEditForm({ title: '', current: '', target: '', targetDate: '' });
  }

  function handleUpdateGoal() {
    if (!editingGoalId) return;
    const title = editForm.title.trim();
    const current = Number(editForm.current);
    const target = Number(editForm.target);
    const targetDate = editForm.targetDate;
    if (!title || Number.isNaN(current) || Number.isNaN(target) || target <= 0 || !targetDate) return;

    updateGoalContext(editingGoalId, {
      title,
      current: Math.max(0, current),
      target: Math.max(1, target),
      targetDate,
    });
    closeEdit();
  }

  function openDeleteConfirm(goalId: number) {
    setDeleteGoalId(goalId);
    setIsDeleteOpen(true);
  }

  function closeDeleteConfirm() {
    setDeleteGoalId(null);
    setIsDeleteOpen(false);
  }

  function handleConfirmDelete() {
    if (!deleteGoalId) return;
    deleteGoalContext(deleteGoalId);
    closeDeleteConfirm();
  }

  function handleContributeToGoal() {
    if (!contributeGoalId) return;
    const amount = Number(contributeForm.amount);
    if (Number.isNaN(amount) || amount <= 0) return;

    const account = accounts.find((item) => item.id === contributeForm.accountId);
    const goal = goals.find((item) => item.id === contributeGoalId);
    if (!account || !goal || amount > account.balance) return;

    const remaining = goal.target - goal.current;
    const contribution = Math.min(amount, remaining);
    if (contribution <= 0) return;

    setAccounts((prev) =>
      prev.map((item) =>
        item.id === account.id ? { ...item, balance: Math.max(0, item.balance - contribution) } : item
      )
    );

    contributeToGoalContext(contributeGoalId, contribution);
    closeContribute();
  }

  return (
    <div className="goals-page">
      <div className="goals-page-header">
        <button className="goals-create-button" onClick={openAddGoal}>
          + Add New Goal
        </button>
      </div>

      <div className="goals-summary-card">
        <div className="goals-summary-title">Example:</div>
        <div className="goal-item-list">
          {goals.map((goal) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-card-row">
                  <div>
                    <div className="goal-card-title">{goal.title}</div>
                    <div className="goal-card-meta">
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()} • {goal.targetDate}
                    </div>
                  </div>
                  <div className="goal-card-actions">
                    <div className="action-menu-container">
                      <button
                        className="action-menu-button"
                        aria-label="Open goal actions menu"
                        onClick={() => setOpenGoalMenuId((prev) => (prev === goal.id ? null : goal.id))}
                      >
                        ⋯
                      </button>
                      {openGoalMenuId === goal.id && (
                        <div className="action-menu-list">
                          <button className="action-menu-item" onClick={() => openEdit(goal.id)}>
                            Edit Goal
                          </button>
                          <button className="action-menu-item" onClick={() => openContribute(goal.id)}>
                            Contribute to Goal
                          </button>
                          <button className="action-menu-item delete" onClick={() => openDeleteConfirm(goal.id)}>
                            Delete Goal
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                  <span className="progress-label">{progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAddOpen && (
        <div className="modal-overlay" onClick={closeAddGoal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Goal</h3>
            </div>
            <div className="modal-form">
              <label className="modal-label">
                Goal Name
                <input
                  className="modal-input"
                  value={goalName}
                  onChange={(event) => setGoalName(event.target.value)}
                  placeholder="Enter goal name"
                />
              </label>
              <label className="modal-label">
                Target Amount
                <input
                  className="modal-input"
                  value={goalTarget}
                  onChange={(event) => setGoalTarget(event.target.value)}
                  placeholder="Enter target amount"
                />
              </label>
              <label className="modal-label">
                Target Date
                <input
                  className="modal-input"
                  type="date"
                  value={goalDate}
                  onChange={(event) => setGoalDate(event.target.value)}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeAddGoal}>
                Cancel
              </button>
              <button className="modal-button primary" onClick={handleAddGoal}>
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {isContributeOpen && (
        <div className="modal-overlay" onClick={closeContribute}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contribute to Goal</h3>
            </div>
            <div className="modal-form">
              <label className="modal-label">
                Account
                <select
                  className="modal-input"
                  value={contributeForm.accountId}
                  onChange={(event) => setContributeForm((prev) => ({ ...prev, accountId: event.target.value }))}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} (₹{account.balance.toLocaleString()})
                    </option>
                  ))}
                </select>
              </label>
              <label className="modal-label">
                Contribution Amount
                <input
                  className="modal-input"
                  value={contributeForm.amount}
                  onChange={(event) => setContributeForm((prev) => ({ ...prev, amount: event.target.value }))}
                  placeholder="Enter contribution amount"
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeContribute}>
                Cancel
              </button>
              <button className="modal-button primary" onClick={handleContributeToGoal}>
                Contribute
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Goal</h3>
            </div>
            <div className="modal-form">
              <label className="modal-label">
                Title
                <input
                  className="modal-input"
                  value={editForm.title}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>
              <label className="modal-label">
                Current Amount
                <input
                  className="modal-input"
                  value={editForm.current}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, current: event.target.value }))}
                />
              </label>
              <label className="modal-label">
                Target Amount
                <input
                  className="modal-input"
                  value={editForm.target}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, target: event.target.value }))}
                />
              </label>
              <label className="modal-label">
                Target Date
                <input
                  className="modal-input"
                  type="date"
                  value={editForm.targetDate}
                  onChange={(event) => setEditForm((prev) => ({ ...prev, targetDate: event.target.value }))}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeEdit}>
                Cancel
              </button>
              <button className="modal-button primary" onClick={handleUpdateGoal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="modal-overlay" onClick={closeDeleteConfirm}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Goal</h3>
            </div>
            <div className="modal-form">
              <p className="delete-confirm-text">Are you sure you want to delete this goal?</p>
            </div>
            <div className="modal-actions">
              <button className="modal-button" onClick={closeDeleteConfirm}>
                Cancel
              </button>
              <button className="modal-button delete primary" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

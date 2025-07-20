import React, { useState } from 'react';

function GoalItem({ goal, onDelete, onUpdate }) {
    const [deposit, setDeposit] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: goal.name,
        category: goal.category,
        targetAmount: goal.targetAmount,
        deadline: goal.deadline,
    });

    const progress = (goal.savedAmount / goal.targetAmount) * 100;
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const isCompleted = goal.savedAmount >= goal.targetAmount;
    const isOverdue = deadline < today && !isCompleted;
    const isWarning = daysLeft <= 30 && daysLeft >= 0 && !isCompleted;

    function handleDeposit() {
        const amount = parseFloat(deposit);
        if (!amount || amount <= 0) return;
        onUpdate(goal.id, { savedAmount: goal.savedAmount + amount });
        setDeposit('');
    }

    function handleEditChange(e) {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    }

    function handleSaveEdit() {
        const updatedGoal = {
            ...editForm,
            targetAmount: parseFloat(editForm.targetAmount),
        };
        onUpdate(goal.id, updatedGoal);
        setIsEditing(false);
    }

    return (
        <div className='goal-item'>
            <h3>{goal.name}</h3>
            <p>Category: {goal.category}</p>
            <p>Target: Ksh: {goal.targetAmount}</p>
            <p>Saved: Ksh: {goal.savedAmount}</p>
            <p>Deadline: {goal.deadline} ({daysLeft} days left)</p>

            {isCompleted && <span className="status completed">Completed</span>}
            {isOverdue && <span className="status overdue">Overdue</span>}
            {isWarning && !isOverdue && <span className="status warning">Almost Due</span>}

            <div className="progress-bar">
                <div style={{ width: `${progress}%` }} className="progress" />
            </div>

            <input
                type='number'
                placeholder='Deposit amount'
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button><br />

            <button className='delete-btn' onClick={() => onDelete(goal.id)}>Delete</button>
            <button className='edit-btn' onClick={() => setIsEditing(!isEditing)}>Edit</button>

            {isEditing && (
                <div className="edit-form">
                    <h4>Edit Goal</h4>
                    <input type="text" name="name" value={editForm.name} onChange={handleEditChange} placeholder="Goal name" />
                    <input type="text" name="category" value={editForm.category} onChange={handleEditChange} placeholder="Category" />
                    <input type="number" name="targetAmount" value={editForm.targetAmount} onChange={handleEditChange} placeholder="Target Amount" />
                    <input type="date" name="deadline" value={editForm.deadline} onChange={handleEditChange} />

                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default GoalItem;

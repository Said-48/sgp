import React, { useState } from 'react';

function GoalForm({ onAddGoal }) {
    const [formData, setFormData] = useState({
        name: '',
        targetAmount: '',
        category: '',
        deadline: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        const currentDate = year + '-' + month + '-' + day;

        const newGoal = {
            ...formData,
            targetAmount: parseFloat(formData.targetAmount),
            savedAmount: 0,
            createdAt: currentDate
        };

        onAddGoal(newGoal);
        setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
    }
    return (
        <div>
            <form className='goal-form' onSubmit={handleSubmit}>
                <input name='name' placeholder="Goal Name" value={formData.name} onChange={handleChange} required />
                <input name='targetAmount' placeholder="Target Amount" value={formData.targetAmount} onChange={handleChange} required />
                <input name='category' placeholder="Category" value={formData.category} onChange={handleChange} required />
                <input name='deadline' type="Date" value={formData.deadline} onChange={handleChange} required />
                <button type="submit">Add a goal</button>
            </form>
        </div>
    );
}

export default GoalForm;
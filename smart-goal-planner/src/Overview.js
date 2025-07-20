import React from 'react';

function Overview({ goals }) {
    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
    const completed = goals.filter(g => g.savedAmount >= g.targetAmount);
    const today = new Date();
    const warning = goals.filter(g => {
        const daysLeft = (new Date(g.deadline) - today) / (1000 * 60 * 60 * 24);
        return daysLeft <= 30 && daysLeft >= 0 && g.savedAmount < g.targetAmount;
    });
    const overdue = goals.filter(g => new Date(g.deadline) < today && g.savedAmount < g.targetAmount);

    return (
        <div className="overview">
            <h2>Overview</h2>
            <p>Total Goals: {totalGoals}</p>
            <p>Total Saved: Ksh: {totalSaved}</p>
            <p>Completed Goals: {completed.length}</p>
            <p>Warnings: {warning.length}</p>
            <p>Overdue: {overdue.length}</p>
        </div>
    );
}

export default Overview;

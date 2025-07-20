import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onDelete, onUpdate }) {
    return (
        <div>
            {goals.map(goal => (
                <GoalItem
                    key={goal.id}
                    goal={goal}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default GoalList;
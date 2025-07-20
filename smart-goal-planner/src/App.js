import { useEffect, useState } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import Overview from "./Overview";
import './App.css'

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  function handleAddGoal(newGoal) {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(addedGoal => setGoals([...goals, addedGoal]));
  }

  function handleUpdateGoal(id, updatedFields) {
    const goalToUpdate = goals.find(goal => goal.id === id);
    const updatedGoal = { ...goalToUpdate, ...updatedFields };

    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
      .then(res => res.json())
      .then(() => {
        const updatedGoals = goals.map(goal =>
          goal.id === id ? updatedGoal : goal
        );
        setGoals(updatedGoals);
      });
  }

  function handleDeleteGoal(id) {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
    })
  }

  return (
    <div className="App">
      <h1>Goals Planner</h1>
      <GoalForm onAddGoal={handleAddGoal} />
      <GoalList goals={goals} onDelete={handleDeleteGoal} onUpdate={handleUpdateGoal} />
      <Overview goals={goals} />

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = { title: newTask, isEditing: false, isCompleted: false };
      setTasks([newTaskItem, ...tasks]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTitle) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, title: updatedTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const taskToComplete = tasks[index];
    const updatedTasks = tasks.filter((task, i) => i !== index);
    taskToComplete.isCompleted = true;
    setTasks([...updatedTasks, taskToComplete]);
  };

  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <h2>(you can press enter to add task)</h2>
      <h3>By Wence De Vera</h3>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="task-bars">
        <div className="task-bar">
          <h2>Tasks</h2>
          <ul className="task-list">
            {incompleteTasks.map((task, index) => (
              <li key={index} className={task.isCompleted ? 'completed' : ''}>
                {task.isEditing ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(index, e.target.value)}
                  />
                ) : (
                  <span>{task.title}</span>
                )}
                <div>
                  <button className="edit-btn" onClick={() => toggleEdit(index)}>
                    {task.isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                  <button className="complete-btn" onClick={() => toggleComplete(index)}>
                    {task.isCompleted ? 'Undo' : 'Complete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="task-bar">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {completedTasks.map((task, index) => (
              <li key={index} className="completed">
                <span>{task.title}</span>
                <div>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

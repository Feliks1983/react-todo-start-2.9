import { useState } from 'react';

export default function NewTaskForm({ handleAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      handleAddTask(text);
      setText('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </header>
  );
}
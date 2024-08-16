import React, { useState, useEffect } from 'react';
import useTodos from '../hooks/useTodos';
import TodoTable from './TodoTable';

const Upcoming = () => {
  const { todos, loading, error } = useTodos();
  const [upcomingTodos, setUpcomingTodos] = useState([]);

  useEffect(() => {
    if (todos && todos.length > 0) {
      const today = new Date();
      const upcomingDate = new Date(today);
      upcomingDate.setDate(today.getDate() + 7);

      const filteredTodos = todos.filter((todo) => {
        const dueDate = new Date(todo.duedate);
        return dueDate >= today && dueDate <= upcomingDate;
      });

      setUpcomingTodos(filteredTodos);
    }
  }, [todos]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="upcoming-todos">
      {upcomingTodos.length > 0 ? (
        <TodoTable title="Upcoming Todos" todos={upcomingTodos} />
      ) : (
        <p>No upcoming todos available.</p>
      )}
    </div>
  );
};

export default Upcoming;

import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import TodoTable from './TodoTable';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './TodoItem.css'

const groupTodosByMonth = (todos) => {
  const grouped = todos.reduce((acc, todo) => {
    const month = new Date(todo.duedate).toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(todo);
    return acc;
  }, {});
  return grouped;
};

const TodoItem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { todos, loading, error, deleteTodo, updateTodo } = useTodos();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const filteredTodos = todos.filter(todo => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = todo.title.toLowerCase().includes(searchLower);
    const descriptionMatch = todo.description.toLowerCase().includes(searchLower);
    const categoryMatch = todo.category.toLowerCase().includes(searchLower);
    const progressMatch = todo.progress.toLowerCase().includes(searchLower);


    return titleMatch || descriptionMatch || categoryMatch || progressMatch;
  });

  const groupedTodos = groupTodosByMonth(filteredTodos);

  const handleEdit = (todo) => {
    navigate(`/edit-todo/${todo._id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(id);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateTodo({
        _id: id,
        progress: 'completed'
      });
    } catch (err) {
      console.error('Error completing todo:', err);
    }
  };

  return (
    <div className="main-content">

      <div className="todo-item-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div class='hint'>click on the table cell to see description</div>

        <div className="todo-list">
          {Object.keys(groupedTodos).map((month) => (
            <TodoTable
              key={month}
              title={month}
              todos={groupedTodos[month]}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

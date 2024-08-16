import React from 'react';
import { useParams } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import TodoTable from './TodoTable';

const CategoryFilter = () => {
    const { category } = useParams(); // Get the category from the route parameters
    const { todos, loading, error } = useTodos();

    console.log('Selected Category:', category); // Log category
    console.log('Todos:', todos); // Log todos

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Filter todos based on the category
    const filteredTodos = todos.filter(todo => todo.category === category);

    return (
        <div className="todo-page">
            <TodoTable title={`Todo List - ${category}`} todos={filteredTodos} />
        </div>
    );
};

export default CategoryFilter;

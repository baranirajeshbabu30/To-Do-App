import React from 'react';
import { useParams } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import TodoTable from './TodoTable';

const CategoryFilter = () => {
    const { category } = useParams(); 
    const { todos, loading, error } = useTodos();


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const filteredTodos = todos.filter(todo => todo.category === category);

    return (
        <div className="todo-page">
            <TodoTable title={`Todo List - ${category}`} todos={filteredTodos} />
        </div>
    );
};

export default CategoryFilter;

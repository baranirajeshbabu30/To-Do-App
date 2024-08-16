import React from 'react';
import TodoTable from './TodoTable';

const TodoCard = ({ title, todos }) => {
    return (
        <div className="todo-card">
            <h2>{title}</h2>
            <TodoTable todos={todos} />
        </div>
    );
};

export default TodoCard;

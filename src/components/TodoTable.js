import React, { useState } from 'react';
import './TodoTable.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const TodoTable = ({ title, todos, onEdit, onDelete, onComplete }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRowClick = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="todo-card-with-table">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <React.Fragment key={todo._id}>
                  <tr onClick={() => handleRowClick(todo._id)}>
                    <td>{todo.title}</td>
                    <td>{new Date(todo.duedate).toLocaleDateString()}</td>
                    <td>{todo.category}</td>
                    <td>{todo.progress}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); onEdit(todo); }}>Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(todo._id); }}>Delete</button>
                      
                      {todo.progress !== 'completed' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onComplete(todo._id); }}
                          title="Mark as completed"
                        >
                          <i className="fas fa-check"></i> 
                        </button>
                      )}
                    </td>
                  </tr>
                  {expandedRowId === todo._id && (
                    <tr className="subtable">
                      <td colSpan="5">
                        <div className="subtable-content">
                          <p><strong>Description:</strong> {todo.description}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-todos">No todos available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTodos from '../hooks/useTodos';
import { useForm, Controller } from 'react-hook-form';
import '../components/AddTodoForm.css';

const categories = ['Work', 'Personal', 'Study', 'Other'];

const AddTodoForm = () => {
  const { addTodo, updateTodo, todos } = useTodos();
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { control, handleSubmit, setValue,  formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: categories[0],
      customCategory: '',
      duedate: ''
    }
  });

  useEffect(() => {
    if (id) {
      const todoToEdit = todos.find(todo => todo._id === id);
      if (todoToEdit) {
        setValue('title', todoToEdit.title);
        setValue('description', todoToEdit.description);
        setValue('category', todoToEdit.category);
        setValue('duedate', todoToEdit.duedate.slice(0, 10));
      }
    }
  }, [id, todos, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedTodo = {
        ...data,
        category: data.category === 'Other' ? data.customCategory : data.category,
        progress: 'active',
      };

      if (id) {
        await updateTodo({
          ...updatedTodo,
          _id: id,
        });
      } else {
        await addTodo(updatedTodo);
      }
      navigate('/todo-list');
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  return (
    <div className="add-task-form">
      <h2>{id ? 'Edit Task' : 'Add a New Task'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <input
                type="text"
                id="title"
                {...field}
                className={errors.title ? 'input-error' : ''}
              />
            )}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <textarea
                id="description"
                {...field}
                className={errors.description ? 'input-error' : ''}
              />
            )}
          />
          {errors.description && <span className="error-message">{errors.description.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                id="category"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  if (e.target.value !== 'Other') {
                    setValue('customCategory', '');
                  }
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

      
        <div className="form-group">
          <label htmlFor="duedate">Due Date:</label>
          <Controller
            name="duedate"
            control={control}
            rules={{ required: 'Due date is required' }}
            render={({ field }) => (
              <input
                type="date"
                id="duedate"
                {...field}
                className={errors.duedate ? 'input-error' : ''}
              />
            )}
          />
          {errors.duedate && <span className="error-message">{errors.duedate.message}</span>}
        </div>

        <button type="submit" className="submit-button">
          {id ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;

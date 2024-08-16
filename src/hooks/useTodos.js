import { useState, useCallback, useMemo, useEffect } from 'react';
import axios from '../api/axios';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  const saveTodos = useCallback((todos) => {
    setTodos(todos);
  }, []);

  const fetchTodos = useCallback(async () => {
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`task/todo/${userId}`);
      saveTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Error fetching todos');
    } finally {
      setLoading(false);
    }
  }, [userId, saveTodos]);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('task/todo/category'); 
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Error fetching categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
    fetchCategories();
  }, [fetchTodos, fetchCategories]);

  const addTodo = useCallback(async (todo) => {
    setLoading(true);
    try {
      const response = await axios.post('task/todo', { ...todo, userId });
      const newTodos = [...todos, response.data];
      saveTodos(newTodos);
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Error adding todo');
    } finally {
      setLoading(false);
    }
  }, [todos, userId, saveTodos]);

  const updateTodo = useCallback(async (updatedTodo) => {
    setLoading(true);
    try {
      const response = await axios.put(`task/todo/${updatedTodo._id}`, updatedTodo);
      const updatedTodos = todos.map(todo => 
        todo._id === updatedTodo._id ? response.data : todo
      );
      saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Error updating todo');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  const deleteTodo = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`task/todo/${id}`);
      const updatedTodos = todos.filter(todo => todo._id !== id);
      saveTodos(updatedTodos);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Error deleting todo');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  const filteredTodos = useMemo(() => {
  
  
    return todos.filter(todo => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const lowerCaseTitle = todo.title.toLowerCase();
      const lowerCaseCategory = todo.category.toLowerCase();
      const lowerCaseProgress = todo.progress.toLowerCase();
      

      if (filter === 'active' && todo.progress === 'completed') {
        return false;
      }
      if (filter === 'completed' && todo.progress === 'active') {
        return false;
      }
      if (selectedCategory !== 'All' && todo.category !== selectedCategory) {
        return false;
      }
      if (searchTerm) {
        const matchTitle = lowerCaseTitle.includes(lowerCaseSearchTerm);
        const matchCategory = lowerCaseCategory.includes(lowerCaseSearchTerm);
        const matchProgress = lowerCaseProgress.includes(lowerCaseSearchTerm);


        return matchTitle || matchCategory || matchProgress;
      }
      return true;
    });
  }, [todos, filter, searchTerm, selectedCategory]);

  return {
    todos: filteredTodos,
    categories,
    addTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    setSearchTerm,
    setSelectedCategory,
    filter,
    searchTerm,
    selectedCategory,
    loading,
    error
  };
};

export default useTodos;

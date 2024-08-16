import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import CategoryFilter from './components/CategoryFilter';
import HomePage from './layout/Homepage';
import Welcome from './layout/Welcome';
import Upcoming from './components/Upcoming';
import Layout from './layout/Homepage';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-todo" element={<AddTodoForm />} />
          <Route path="/edit-todo/:id" element={<AddTodoForm />} />
          <Route path="/todo-list" element={<TodoItem searchTerm={searchTerm} />} />
          <Route path="/category/:category" element={<CategoryFilter />} />

          <Route path="/upcoming" element={<Upcoming />} />
        </Route>
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;

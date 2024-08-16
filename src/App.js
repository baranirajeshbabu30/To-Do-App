import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import CategoryFilter from './components/CategoryFilter';
import HomePage from './layout/Homepage';
import Upcoming from './components/Upcoming';
import Layout from './layout/Homepage';
import ToastProvider from './layout/ToastProvider';

const App = () => {

  return (
    <Router>
      <ToastProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-todo" element={<AddTodoForm />} />
          <Route path="/edit-todo/:id" element={<AddTodoForm />} />
          <Route path="/todo-list" element={<TodoItem />} />
          <Route path="/category/:category" element={<CategoryFilter />} />

          <Route path="/upcoming" element={<Upcoming />} />
        </Route>
      </Routes>
      </ToastProvider>
    </Router>
  );
};

const AppWrapper = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;

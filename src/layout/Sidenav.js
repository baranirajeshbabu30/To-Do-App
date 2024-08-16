import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, CircularProgress, Snackbar } from '@mui/material';
import useTodos from '../hooks/useTodos';

const Sidenav = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const { loading, error } = useTodos();

  const categories = [
    { _id: '1', name: 'Work' },
    { _id: '2', name: 'Personal' },
    { _id: '3', name: 'Study' },
    { _id: '4', name: 'Others' },
  ];

  return (
    <div className="sidenav-container">
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: 8,
            height: 550,
          },
        }}
        className="sidenav-drawer"
      >
        <List>
          <ListItem button component={Link} to="/add-todo">
            <ListItemText primary="Add ToDo" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/todo-list">
            <ListItemText primary="ToDo List" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setOpenCategory(!openCategory)}>
            <ListItemText primary="Category" />
          </ListItem>
          {openCategory && (
            <List component="div" disablePadding>
              {loading ? (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              ) : error ? (
                <ListItem>
                  <ListItemText primary="Error fetching categories" />
                </ListItem>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <ListItem
                    button
                    key={category._id}
                    component={Link}
                    to={`/category/${category.name}`}
                  >
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No categories available" />
                </ListItem>
              )}
            </List>
          )}
          <Divider />
          <ListItem button component={Link} to="/upcoming">
            <ListItemText primary="Upcoming" />
          </ListItem>
        </List>
      </Drawer>
      <div className="content"></div>

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000}>
        </Snackbar>
      )}
    </div>
  );
};

export default Sidenav;

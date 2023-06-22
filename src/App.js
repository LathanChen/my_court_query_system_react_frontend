import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './router-config';

function App() {
  return (
    <Routes>
    {routes.map(({ path, element, children, props }) => (
      <Route key={path} path={path} element={element} {...props}>
        {children && children.map(({ path, element, props }) => (
          <Route key={path} path={path} element={element} {...props} />
        ))}
      </Route>
    ))}
  </Routes>
     
  );
}

export default App;

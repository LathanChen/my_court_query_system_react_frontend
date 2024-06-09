import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import routes from './router-config';
import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

function App() {

  const dispatch = useDispatch();
  
  const openSnackbar = useSelector(state => state.openSnackbar);
  const alertSettings = useSelector(state => state.alertSettings);

  const handleClose = () => {
    dispatch({
      type: 'CHANGEOPENSNACKBAR',
      payload: false,
  });
  };

  return (
    <>
      <Routes>
        {routes.map(({ path, element, children, props }) => (
          <Route key={path} path={path} element={element} {...props}>
            {children && children.map(({ path, element, props }) => (
              <Route key={path} path={path} element={element} {...props} />
            ))}
          </Route>
        ))}
      </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertSettings.type} onClose={handleClose}>
          {alertSettings.text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

import React, { FC, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Adjust the import path as necessary
import { useDispatch } from 'react-redux';
import { setFieldSetData } from './store/formSlice';
import Form from './components/Form/Form';
import fieldSetData from './utils/field-set.json'; // Your JSON data

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
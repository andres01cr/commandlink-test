import React, { FC, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFieldSetData } from './store/formSlice';
import Form from './components/Form/Form';
import fieldSetData from './utils/field-set.json'; // Your JSON data

const App: FC = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFieldSetData(fieldSetData));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
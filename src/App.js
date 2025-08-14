import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Test from './pages/Test'
import MainLayout from './layouts/MainLayout';
import JsonParser from './pages/JsonParser';


class App extends React.Component {
  render() {
    return(
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="test" element={<Test />} />
          <Route path="json-parser" element={<JsonParser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }

}

export default App;
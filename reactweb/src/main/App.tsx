import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import HouseList from '../houses/HouseList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HouseDetail from '../houses/HouseDetail';

// npm install axios@0 react-query@3 para substituir fetch do JS

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <Routes>
          <Route path='/' element={<HouseList />}></Route>
          <Route path="/house/:id" element={<HouseDetail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

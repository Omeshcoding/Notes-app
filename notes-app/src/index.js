import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import Currency from './Currency';
// console.log(promise);
// const promise2 = axios.get('http://localhost:3002/foobar');
// console.log(promise2);

// const promise = axios.get('http://localhost:3002/notes').then((response) => {
//   const notes = response.data;
//   // console.log(1, notes);
//   // ReactDOM.createRoot(document.getElementById('root')).render(<App />);
// });
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

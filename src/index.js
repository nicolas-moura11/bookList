import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // importação do arquivo styles.css
import BookList from './BookList';

ReactDOM.render(
  <React.StrictMode>
    <BookList />
  </React.StrictMode>,
  document.getElementById('root')
);

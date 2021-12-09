import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
console.log(process.env.BASE_URL)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

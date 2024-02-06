import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root'); // Make sure 'app' matches your HTML
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}><App tab="home" /></Provider>);

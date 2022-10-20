import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { UserEdit } from './components/UserEdit/UserEdit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const strictMode = process.env.NODE_ENV === 'production';

root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}/>

      <Route path="/users/:userName" element={<UserEdit/>} />
    </Routes>
  </HashRouter>,
);
// root.render(
//   (strictMode && (
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   )) || <App />,
// );

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { AuthProvider } from './context/AuthContext'; 
// import './index.css'; // <--- ADD THIS LINE HERE

// ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode> {/* Optional: Add React.StrictMode for development checks */}
//     <BrowserRouter> {/* BrowserRouter is now the parent */}
//       <AuthProvider> {/* AuthProvider is now inside BrowserRouter */}
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { HashRouter } from 'react-router-dom'; // <--- IMPORTANT CHANGE IS HERE: Changed from BrowserRouter to HashRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* <--- IMPORTANT CHANGE IS HERE: Changed from BrowserRouter to HashRouter */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
);
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Stairs from './components/common/Stairs.jsx'
import NavContext from './context/NavContext.jsx'
import Navbar from './components/Navigation/Navbar.jsx'
import FullScreenNav from './components/Navigation/FullScreenNav.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavContext>
        <Navbar />
        <FullScreenNav />
        <Stairs>
          <App />
        </Stairs>
      </NavContext>
    </BrowserRouter>
  </React.StrictMode>,
)

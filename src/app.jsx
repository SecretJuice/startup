import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Event } from './event/event';
import { Login } from './login/login';
import { Waiting } from './waiting/waiting';
import { Checkin } from './checkin/checkin';
import { About } from './about/about';
import React from 'react';
import "./app.css"

export default function App() {
    const [user, setUser] = React.useState(localStorage.getItem("user"))

    function logout() {
        localStorage.clear("user")
        setUser(null)
    }

    return <BrowserRouter> 
      <header className="container">

      <nav>
        <ul>
          <li><NavLink to=""><h3>Groupify</h3></NavLink></li>
        </ul>
        {user && <ul>
          <li><NavLink to="event">Create Event</NavLink></li>
          <li><NavLink to="checkin">Join Event</NavLink></li>
          <li><NavLink to="waiting">Waiting Event</NavLink></li>
          <li><NavLink to="about">About</NavLink></li>
          <li><NavLink to="" onClick={logout}>{user}</NavLink></li>
        </ul>}
      </nav>

      <hr />
    </header>

        <Routes>
          <Route path='/' element={<Login setUser={setUser}/>} />
          <Route path='/event' element={<Event/>} />
          <Route path='/checkin' element={<Checkin/>} />
          <Route path='/waiting' element={<Waiting/>} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

    <footer className="container">
      <hr />
      <nav>
          <ul>
              <li>Created by: Connor Robb</li>
          </ul>
          <ul>
              <li>
                  <a href="https://github.com/SecretJuice/startup">GitHub</a>
              </li>
          </ul>
      </nav>
    </footer>
    </BrowserRouter>
}

function NotFound() {
  return <main className="container">404: Return to sender. Address unknown.</main>;
}

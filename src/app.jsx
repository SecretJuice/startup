import React from 'react';

export default function App() {
  return <div> 
      <header class="container">

      <nav>
        <ul>
          <li><a href="index.html"><h2>Groupify</h2></a></li>
        </ul>
        <ul>
          <li><a href="event.html">Create Event</a></li>
          <li><a href="checkin.html">Join Event</a></li>
          <li><a href="waiting.html">Waiting</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </nav>

      <hr />
    </header>

    <main className="container">App will display here</main>

    <footer class="container">
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
    </div>
}

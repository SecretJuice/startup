import React from 'react';

export function Waiting() {
  return (
    <main className="container">

      <h2>
        Event Code: 1234
      </h2>
      <h3>
        Group: B
      </h3>

      <p>
        Welcome to the stake activity!
      </p>

      <p>
        We'll let you know when you're up
      </p>

      <dialog open>
          <article>
              <header>
                  <button aria-label="Close" rel="prev"></button>
                  <p>
                  <strong>🔔 You're Up!</strong>
              </p>
          </header>
              <p>
              Your group is being called! Move to the serving area as soon as your ready!
              </p>
              <small>This is a placeholder for the WebSocket based notification system</small>
          </article>
      </dialog>
    </main>
  );
}

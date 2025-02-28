import React from 'react';

export function Checkin() {
  return (
    <main className="container">
      <h2>Welcome to Groupify</h2>
      <br/>
      <form method="get" action="waiting">
          <input name="patron_name" type="text" placeholder="Name" />
          <small>Enter your name</small>
          <input name="event_code" type="number" placeholder="Code" />
          <small>Enter your event code</small>
          <input type="submit" value="Check-In" />
        </form>
      <form method="get" action="waiting">
          <input className="secondary" type="submit" value="Or Scan QR Code" />
        </form>
    </main>
  );
}

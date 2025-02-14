import React from 'react';

export function Login() {
  return (
    <main className="container">
      <h1>Welcome to Groupify</h1>
      <form method="get" action="event">
          <fieldset>
              <label htmlFor="username">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  autoComplete="given-name"
                />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="password"
              />
          </fieldset>
        <input type="submit" value="Login"/>
      </form>
    </main>
  );
}

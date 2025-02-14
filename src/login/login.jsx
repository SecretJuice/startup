import React from 'react';

export function Login() {
  return (
    <main class="container">
      <h1>Welcome to Groupify</h1>
      <form method="get" action="create.html">
          <fieldset>
              <label for="username">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  autocomplete="given-name"
                />

              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autocomplete="password"
              />
          </fieldset>
        <input type="submit" value="Login"/>
      </form>
    </main>
  );
}

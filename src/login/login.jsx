import React from 'react';

export function Login({setUser}) {
  const [text, setText] = React.useState(null)

  function loginUser() {
      localStorage.setItem("user", text)
      setUser(text)
  }

  function textChange(e) {
      setText(e.target.value)
  }

  return (
    <main className="container">
      <h1>Welcome to Groupify</h1>
      <form method="get" action="events">
          <fieldset>
              <label htmlFor="username">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  autoComplete="given-name"
                  onChange={textChange}
                />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="password"
              />
          </fieldset>
        <input type="submit" value="Login" onClick={loginUser}/>
        <a href="checkin">Or just join an event instead</a>
      </form>
    </main>
  );
}

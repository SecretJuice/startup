import React from 'react';

import { MessageDialog } from './messageDialog';


export function Login({setUser}) {
  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [displayError, setDisplayError] = React.useState(null);

  //function loginUser() {
  //    localStorage.setItem("user", text)
  //    setUser(text)
  //}

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
      }

      async function createUser() {
        loginOrCreate(`/api/auth/create`);
      }

      async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ email: userName, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        if (response?.status === 200) {
          localStorage.setItem('userName', userName);
          props.onLogin(userName);
        } else {
          const body = await response.json();
          setDisplayError(`⚠ Error: ${body.msg}`);
        }
      }


  return (
    <main className="container">
      <h1>Welcome to Groupify</h1>
      <form>
          <fieldset>
              <label htmlFor="username">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  autoComplete="given-name"
                  onChange={(e) => {setUsername(e.target.value)}}
                />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="password"
                onChange={(e) => {setPassword(e.target.value)}}
              />
          </fieldset>
        <input type="submit" value="Login" onClick={loginUser}/>
        <a href="checkin">Or just join an event instead</a>
      </form>
    <MessageDialog header={`Ooops...`} message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}

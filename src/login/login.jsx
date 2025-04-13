import React from "react";

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import { MessageDialog } from "./messageDialog";

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}


export function Login(props) {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser(evt) {
        evt.preventDefault()
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser(evt) {
        evt.preventDefault()
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: "post",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (response?.status === 200) {
            localStorage.setItem("user", username);
            props.onLogin(username);
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
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </fieldset>
                <input className="primary" type="submit" value="Login" onClick={(e) => loginUser(e)} />
                <input className="secondary" type="submit" value="Create" onClick={(e) => createUser(e)} />
                <a href="checkin">Or just join an event instead</a>
            </form>
            <MessageDialog
                header={`Ooops...`}
                message={displayError}
                onHide={() => setDisplayError(null)}
            />
        </main>
    );
}

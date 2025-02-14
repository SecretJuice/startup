import React from 'react';

export function Event() {
  return (
    <main className="container">
      <h2>Stake Activity</h2>
      <details>
          <summary role="button" className="outline contrast">Group A: 6</summary>
          <div className="container">
              <button className="primary">Call</button>
              <ul>
                  <li>Maria</li>
                  <li>Todd</li>
                  <li>Frank</li>
                  <li>Maria</li>
                  <li>Todd</li>
                  <li>Frank</li>
              </ul>
          </div>
      </details>
      <details>
          <summary role="button" className="outline contrast">Group B: 3</summary>
          <div className="container">
              <button className="primary">Call</button>
              <ul>
                  <li>Maria</li>
                  <li>Todd</li>
                  <li>Frank</li>
              </ul>
          </div>
      </details>
      <details>
          <summary role="button" className="outline secondary">Group C: 3</summary>
          <div className="container">
              <button disabled>Called</button>
              <ul>
                  <li>Maria</li>
                  <li>Todd</li>
                  <li>Frank</li>
              </ul>
          </div>
      </details>
      <br/>
      <hr/>
      <br/>
      <h3>Event Settings</h3>
      <form>
          <fieldset>
            <label>Text Based Option</label>
            <input type="text" placeholder='option 1'/>
            <small>This is a text based option</small>
            <label>Option Name</label>
            <select defaultValue="0" name="fake-option" aria-label="Select an option..." required>
                  <option value="0" disabled>
                    Select an option...
                  </option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
            </select>
            <small>This is an option</small>
          </fieldset>
          <input type="submit" value="Update Settings"/>
      </form>
      <br/>
      <hr/>
      <br/>
      <h3>Group Code: 1234</h3>
      <img src="qrcode.png" alt="QR Code"/>
    </main>
  );
}

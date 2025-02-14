import React from 'react';

export function Event() {
  return (
    <main class="container">
      <h2>Stake Activity</h2>
      <details>
          <summary role="button" class="outline contrast">Group A: 6</summary>
          <div class="container">
              <button class="primary">Call</button>
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
          <summary role="button" class="outline contrast">Group B: 3</summary>
          <div class="container">
              <button class="primary">Call</button>
              <ul>
                  <li>Maria</li>
                  <li>Todd</li>
                  <li>Frank</li>
              </ul>
          </div>
      </details>
      <details>
          <summary role="button" class="outline secondary">Group C: 3</summary>
          <div class="container">
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
            <select name="fake-option" aria-label="Select an option..." required>
                  <option selected disabled value="">
                    Select an option...
                  </option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                  <option>Option 4</option>
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

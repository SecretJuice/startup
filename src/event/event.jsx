import React from 'react';

export function Event() {
  const [openedEvent, setOpenedEvent] = React.useState({
        name: "Stake Activity",
        code: 1234,
        groups: [
            {id: 0, name: "Group A", called: false, members:["Maria", "Todd", "Frank", "Maria", "Todd", "Frank"]},
            {id: 1, name: "Group B", called: true, members:["Maria", "Todd", "Frank"]},
            {id: 2, name: "Group C", called: false, members:["Maria", "Todd", "Frank"]},
            {id: 3, name: "Group D", called: false, members:["Maria", "Todd", "Frank", "Maria", "Todd", "Frank"]},
        ]
  })


  return (
    <main className="container">
      <h2>Stake Activity</h2>
      {openedEvent.groups.map((group) => (
            <EventGroup key={group.id} group={group} called={group.called}/>
      ))}
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


function EventGroup({group, called}) {

    const [isCalled, setIsCalled] = React.useState(called)

    function call() {
        console.log(`Calling ${group.name}!`)
        setIsCalled(true)
    }
    return (
       <details>
            <summary role="button" className={isCalled ? "secondary outline" : ""}>{group.name}: {group.members.length}</summary>
            <div className="container">
                <button disabled={isCalled} onClick={call}>{called ? "Called": "Call"}</button>
                <ul>
                {group.members.map((member, i) => (
                    <li key={i}>{member}</li> 
                ))}                
                </ul>
            </div>
       </details>
    )
}

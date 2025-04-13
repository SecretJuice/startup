import React from "react";

export function Event() {
    const [openedEvent, setOpenedEvent] = React.useState({
        name: "Stake Activity",
        code: 1234,
        groups: [
            {
                id: 0,
                name: "Group A",
                called: false,
                members: ["Maria", "Todd", "Frank", "Maria", "Todd", "Frank"],
            },
            {
                id: 1,
                name: "Group B",
                called: true,
                members: ["Maria", "Todd", "Frank"],
            },
            {
                id: 2,
                name: "Group C",
                called: false,
                members: ["Maria", "Todd", "Frank"],
            },
            {
                id: 3,
                name: "Group D",
                called: false,
                members: ["Maria", "Todd", "Frank", "Maria", "Todd", "Frank"],
            },
        ],
        settings: {
            groupStrategy: "automatic",
            entryMessage: "Welcome to the Stake Activity!",
        },
    });

    function setSettings(settings) {
        let newSettings = openedEvent;
        newSettings.settings = settings;
        updateEvent(newSettings);
    }

    function callGroup(id) {
        let newEvent = openedEvent;
        newEvent.groups.forEach((group) => {
            if (group.id === id) {
                group.called = true;
            }
        });
        updateEvent(newEvent);
    }

    function updateEvent(event) {
        console.log(event);
        setOpenedEvent(event);
    }

    return (
        <main className="container">
            <h2>{openedEvent.name}</h2>
            {openedEvent.groups.map((group) => (
                <EventGroup
                    key={group.id}
                    group={group}
                    callGroup={callGroup}
                    called={group.called}
                />
            ))}
            <br />
            <hr />
            <br />
            <h3>Event Settings</h3>
            <EventSettings
                settings={openedEvent.settings}
                setSettings={setSettings}
            />
            <br />
            <hr />
            <br />
            <h3>Group Code: {openedEvent.code}</h3>
            <img src="qrcode.png" alt="QR Code" />
        </main>
    );
}

function EventGroup({ group, called, callGroup }) {
    const [isCalled, setIsCalled] = React.useState(called);

    function call() {
        console.log(`Calling ${group.name}!`);
        setIsCalled(true);
        callGroup(group.id);
    }
    return (
        <details>
            <summary
                role="button"
                className={isCalled ? "secondary outline" : ""}
            >
                {group.name}: {group.members.length}
            </summary>
            <div className="container">
                <button disabled={isCalled} onClick={call}>
                    {called ? "Called" : "Call"}
                </button>
                <ul>
                    {group.members.map((member, i) => (
                        <li key={i}>{member}</li>
                    ))}
                </ul>
            </div>
        </details>
    );
}

function EventSettings({ settings, setSettings }) {
    const [groupStrategy, setGroupStrategy] = React.useState(
        settings.groupStrategy,
    );
    const [entryMessage, setEntryMessage] = React.useState(
        settings.entryMessage,
    );

    function handleMessageChange(e) {
        setEntryMessage(e.target.value);
    }

    function handleGroupStratChange(e) {
        setGroupStrategy(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSettings({
            groupStrategy: groupStrategy,
            entryMessage: entryMessage,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>Entry Message</label>
                <input
                    type="text"
                    placeholder='"Welcome..."'
                    defaultValue={entryMessage}
                    onChange={handleMessageChange}
                />
                <small>Entry message will be displayed to patrons</small>
                <label>Group Making Strategy</label>
                <select
                    defaultValue={groupStrategy}
                    name="fake-option"
                    aria-label="Select an option..."
                    required
                    onChange={handleGroupStratChange}
                >
                    <option value="0" disabled>
                        Select an option...
                    </option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                    <option value="teams">Teams</option>
                </select>
                <small>
                    How would you like to control how groups are formed?
                </small>
            </fieldset>
            <input type="submit" value="Update Settings" />
        </form>
    );
}

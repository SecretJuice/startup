import React, { useEffect } from "react";

export function Event() {
    const [openedEvent, setOpenedEvent] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    async function setSettings(settings) {
        let newEvent = openedEvent;
        newEvent.settings = settings;

        const res = await fetch("/api/events/" + newEvent.code + "/settings", {
            method: "put",
            body: JSON.stringify(settings),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (res.ok) {
            updateEvent(newEvent);
        } else {
            console.error("COULD NOT UPDATE SETTINGS");
        }
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

    useEffect(() => {
        const code = localStorage.getItem("event");

        const getEvent = async () => {
            const res = await fetch("/api/events/" + code);

            if (res.ok) {
                const body = await res.json();
                setOpenedEvent(body);
                setLoading(false);
            } else {
                console.error("COULD NOT GET EVENT: " + res.status);
            }
        };
        getEvent();
    }, []);

    return (
        <main className="container">
            <h2>{openedEvent.name}</h2>
            {loading ? (
                <h2>Loading...</h2>
            ) : openedEvent.groups.length === 0 ? (
                <h3>No Groups Yet</h3>
            ) : (
                openedEvent.groups.map((group) => (
                    <EventGroup
                        key={group.id}
                        group={group}
                        callGroup={callGroup}
                        called={group.called}
                    />
                ))
            )}
            <br />
            <hr />
            <h3>Event Settings</h3>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <EventSettings
                    settings={openedEvent.settings}
                    setSettings={setSettings}
                />
            )}
            <br />
            <hr />
            <h3>Group Code: {openedEvent.code}</h3>
            <img
                src={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://startup.cs260.conrobb.com/api/join/" +
                    openedEvent.code
                }
                alt="QR Code"
            />
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
    const [entryMessage, setEntryMessage] = React.useState(
        settings.entryMessage,
    );
    const [groupCapacity, setGroupCapacity] = React.useState(
        settings.groupCapacity,
    );

    function handleMessageChange(e) {
        setEntryMessage(e.target.value);
    }

    function handleGroupCapChange(e) {
        setGroupCapacity(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSettings({
            groupCapacity: groupCapacity,
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
                <label>Group Capacity</label>
                <input
                    type="number"
                    placeholder="e.g 5"
                    defaultValue={groupCapacity}
                    onChange={handleGroupCapChange}
                />
                <small>How many should fit in each group?</small>
            </fieldset>
            <input type="submit" value="Update Settings" />
        </form>
    );
}

import React from "react";

import { MessageDialog } from "../login/messageDialog";

export function CreateEvent(props) {
    const [eventName, setEventName] = React.useState(null);
    const [groupCapacity, setGroupCapacity] = React.useState(null);
    const [displayError, setDisplayError] = React.useState(null);

    async function createEvent(evt) {
        evt.preventDefault();
        const response = await fetch("/api/events", {
            method: "post",
            body: JSON.stringify({
                name: eventName,
                groupCapacity: groupCapacity,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (response?.status === 201) {
            props.onCreateEvent({
                name: eventName,
                attendees: 0,
                concluded: false,
            });
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <main className="container">
            <form>
                <fieldset>
                    <label htmlFor="eventname">Event Name</label>
                    <input
                        name="eventname"
                        placeholder="Event Name"
                        onChange={(e) => {
                            setEventName(e.target.value);
                        }}
                    />

                    <label htmlFor="capacity">Group Capacity</label>
                    <input
                        name="capacity"
                        onChange={(e) => {
                            setGroupCapacity(e.target.value);
                        }}
                    />
                </fieldset>
                <input
                    className="primary"
                    type="submit"
                    value="Start Event"
                    onClick={(e) => createEvent(e)}
                />
            </form>
            <MessageDialog
                header={`Ooops...`}
                message={displayError}
                onHide={() => setDisplayError(null)}
            />
        </main>
    );
}

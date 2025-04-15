import React from "react";
import { useNavigate } from "react-router-dom";

export function Checkin() {
    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState(0);

    const navigate = useNavigate();

    async function joinEvent(e) {
        e.preventDefault();
        const res = await fetch("api/events/" + code + "/join", {
            method: "put",
            body: JSON.stringify({ name: name }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (res.ok) {
            const body = await res.json();
            localStorage.setItem("visitorName", body.name);
            localStorage.setItem("groupName", body.groupName);
            localStorage.setItem("message", body.entryMessage);
            navigate("/waiting");
        } else {
            console.error("COULDNT JOIN EVENT");
        }
    }

    return (
        <main className="container">
            <h2>Welcome to Groupify</h2>
            <br />
            <form>
                <input
                    name="patron_name"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <small>Enter your name</small>
                <input
                    name="event_code"
                    type="number"
                    placeholder="Code"
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
                <small>Enter your event code</small>
                <input type="submit" value="Check-In" onClick={joinEvent} />
            </form>
            <form>
                <input
                    className="secondary"
                    type="submit"
                    value="Or Scan QR Code"
                />
            </form>
        </main>
    );
}

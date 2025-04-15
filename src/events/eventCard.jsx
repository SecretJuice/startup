import React from "react";
import { useNavigate } from "react-router-dom";

export function EventCard({ event }) {

    const navigate = useNavigate();

    function openEvent() {
        if (event.concluded) return;
        localStorage.setItem("event", event.code)
        console.log(localStorage.getItem("event"))
        navigate("/event");
    }

    function getAttendeeCount(groupifyEvent) {
        return 0
    }

    return (
        <article>
            <nav>
                <ul>
                    <li>
                        <strong>{event.name}</strong>
                    </li>
                </ul>
                <ul>
                    <li>{getAttendeeCount(event)} attendees</li>
                    <li>
                        <button
                            className={`${event.concluded ? "secondary" : "disabled"}`}
                            onClick={openEvent}
                        >
                            {!event.concluded ? "Manage" : "Concluded"}
                        </button>
                    </li>
                </ul>
            </nav>
        </article>
    );
}

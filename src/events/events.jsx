import React from "react";
import { EventCard } from "./eventCard";

export function Events() {
    const [events, setEvents] = React.useState([
        { name: "Stake Activity", attendees: 286, concluded: false },
        { name: "Birthday Party", attendees: 48, concluded: true },
        { name: "Retirement Party", attendees: 99, concluded: true },
    ]);

    return (
        <main className="container">
            <h2>Your Events</h2>
            {events.map((events, i) => (
                <EventCard
                    name={events.name}
                    attendees={events.attendees}
                    concluded={events.concluded}
                    key={i}
                />
            ))}
        </main>
    );
}

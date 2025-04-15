import React from "react";
import { EventCard } from "./eventCard";
import {CreateEvent} from "./createEvent"
import { useEffect } from "react";

export function Events() {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getEvents = async () => {
        const res = await fetch("/api/events")

        if (res.ok) {

            const body = await res.json()
            setEvents(body)
            setLoading(false)
        } else {
            console.error("COULD NOT GET EVENTS: "+res.status) 
        }
    }
    async function createEvent(groupifyEvent) {
        getEvents()
    }
    useEffect(() => {
        getEvents()
    }, []);

    if (loading) return(
        <main className="container">
            <h3>Loading your events...</h3>
        </main>
    )

    return (
        <main className="container">
            <h2>Your Events</h2>
                {events.length === 0 ? (
                    <p>No events yet. Start one below!</p>
                ) : (events.map((event, i) => (
                        <EventCard
                        key={i}
                        event={event}
                        />
                    ))
                )}
            <h2>Start an Event</h2>
            <CreateEvent onCreateEvent={createEvent}/>
        </main>
    );
}

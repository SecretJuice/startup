import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EventCard({name, attendees, concluded}) {

    const [openedEvent, setOpenedEvent] = React.useState(null)

    const navigate = useNavigate()

    function openEvent() {
        if (concluded) return
        setOpenedEvent(localStorage.getItem(`event`)) 
        navigate("/event")
    }


  return (
      <article>
       <nav>
          <ul>
            <li><strong>{name}</strong></li>
          </ul>
          <ul>
            <li>{attendees} attendees</li>
            <li><button className={`${concluded ? "secondary" : "disabled"}`}
                 onClick={openEvent}>
                {!concluded ? "Manage" : "Concluded"}</button></li>
          </ul>
        </nav> 
      </article>
  );
}

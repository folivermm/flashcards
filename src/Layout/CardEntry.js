import React from "react";
// Import necessary components from react-router-dom
import { Link, useRouteMatch } from "react-router-dom";
// import API function 
import { deleteCard } from "../utils/api/index";

// CardEntry accepts the card and getDeck props.
const CardEntry = ({ card, getDeck }) => {
    // useRouteMatch hook is used to access the current URL.
    const { url } = useRouteMatch()
    const handleDelete = async () => {

        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            // it calls the deleteCard API function to delete the card from the database. 
            await deleteCard(card.id)
            // After the deletion, it calls the getDeck function to update the deck.
            await getDeck()
        }
    }

    return (
        // component renders an <article> element that displays the front and back of the card
        <article style={{ border: "solid 1px black" }}>
            <span>
                <p>{card.front}</p>
                <p>{card.back}</p>
            </span>

            <span>
                {/* This button is a Link component that navigates to the card's edit page
                 using the url obtained from useRouteMatch */}
                <Link to={`${url}/cards/${card.id}/edit`}>
                    <button>Edit</button>
                </Link>
                {/* This button triggers the handleDelete function when clicked. */}
                <button onClick={handleDelete}>Delete</button>
            </span>
        </article>
    );
};

export default CardEntry;

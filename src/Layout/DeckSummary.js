import React from "react";
//import API function
import { deleteDeck } from "../utils/api/index";
// Link component imported to create links between different routes 
import { Link } from "react-router-dom";

// component has 3 props: 'deck' that contains the info, 
// 'fetchDecks' function fetches decks, and 'cardCount' card counnt in deck
const DeckSummary = ({ deck, fetchDecks, cardCount },) => {
    // id, name, and description props are extracted 
    // from deck prop using object destructuring.
    const { id, name, description } = deck;

    //handleDelete triggers when the "Delete" button is clicked
    const handleDelete = async () => {

        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            //calls deleteDeck API function from ../utils/api/index
            //to delete the deck with the specified id. 
            await deleteDeck(id)
            //calls the fetchDecks function to update the list of decks.
            await fetchDecks()
        }
    }
    return (
        //deck's name, number of cards in deck, deck's description, and 3 buttons: 
        // "View", "Study", and "Delete". 
        <section>
            <h2>{name} <span><sup>{deck.cards.length} cards</sup></span></h2>
            <p>{description}</p>
            <div>
                {/* 'View' button is a link that navigates to the individual deck's page, */}
                <Link to={`/decks/${id}`}><button>View</button></Link>

                {/* 'Study' button is a link that navigates to the deck's study page */}
                <Link to={`/decks/${id}/study`}><button>Study</button></Link>

                {/* 'Delete' button triggers the handleDelete function. */}
                <button onClick={handleDelete}>Delete</button>
            </div>
        </section>
    );
};

export default DeckSummary;

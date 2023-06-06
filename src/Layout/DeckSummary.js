import React from "react";
import { deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";

const DeckSummary = ({ deck, fetchDecks, cardCount },) => {
    const { id, name, description } = deck;

    const handleDelete = async () => {

        if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
            await deleteDeck(id)
            await fetchDecks()
        }
    }
    return (
        <section>
            <h2>{name} <span><sup>{deck.cards.length} cards</sup></span></h2>
            <p>{description}</p>
            <div>
                <Link to={`/decks/${id}`}><button>View</button></Link>

                <Link to={`/decks/${id}/study`}><button>Study</button></Link>

                <button onClick={handleDelete}>Delete</button>
            </div>
        </section>
    );
};

export default DeckSummary;

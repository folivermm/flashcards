//import react and necessary hooks
import React, { useEffect, useState } from "react";
// Import necessary components from react-router-dom
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
//import API functions
import { deleteDeck, readDeck } from "../utils/api";
//import custom component
import CardEntry from "./CardEntry";

//use prop to get the list of decks
const Deck = ({ fetchDecks }) => {
    //state is set to an empty object
    const [deck, setDeck] = useState({});
    //hook used to retrieve deckId param from url
    const { deckId } = useParams();
    //hook used to get current url and construct urls for edit, study, and add card route
    const { url } = useRouteMatch();
    //hook useed to access history object, enables nav to diff routes
    const history = useHistory();

    //fetch deck details corresponding to deckId params using readDeck function from../utils/api
    const getDeck = async () => {
        const res = await readDeck(deckId);
        //fetced deck data is stored in the deck state using setDeck function
        setDeck(res);
    };


    //function is called when delete button is clicked
    const handleDelete = async () => {
        if (
            window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ) {
            //deletes the deck using the deleteDeck function from ../utils/api
            await deleteDeck(deckId);
            // calls fetchDecks to update the list of decks 
            await fetchDecks();
            //navigates back to the home route
            history.push("/");
        }
    };

    //hook used to call getDeck function whenever the deckId changes
    useEffect(() => {
        getDeck();
    }, [deckId]);

    //checks if deck.name exists, if it does then renders the deck details
    if (deck.name) {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <Link to="/">Home</Link> / {deck.name}
                    </p>
                </div>
                {/* deck details...name, description, buttons for edit, study, add cards, and delete deck */}
                <section>
                    <h2>{deck.name}</h2>
                    <article>
                        <p>{deck.description}</p>
                        <span>
                            <Link to={`${url}/edit`}>
                                <button>Edit</button>
                            </Link>

                            <Link to={`${url}/study`}>
                                <button>Study</button>
                            </Link>

                            <Link to={`${url}/cards/new`}>
                                <button>Add Cards</button>
                            </Link>

                            <button onClick={handleDelete}>Delete</button>
                        </span>
                    </article>
                </section>

                {/* renders the associated cards using the CardEntry component. */}
                <section>
                    <h2>Cards</h2>
                    {deck.cards.map(card => <CardEntry key={card.id} card={card} getDeck={getDeck} />)}
                </section>
            </React.Fragment>
        );
    }

    //If the deck.name property does not exist, a loading message is displayed.
    return <h2>Loading...</h2>;
};

export default Deck;

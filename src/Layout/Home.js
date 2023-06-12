//import react and necessary hooks
import React, { useState, useEffect } from "react";
// Import necessary components from react-router-dom
import { Switch, Route, Link } from "react-router-dom";
//import API functions
import { listDecks } from "../utils/api/index";
//import custom components
import DeckSummary from "./DeckSummary";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";

// useState hook declares a state variable 'decks' 
// and 'setDecks' function to update its value. 
// The initial value of decks is an empty array.
const Home = () => {
    const [decks, setDecks] = useState([]);

    // fetchDecks fetches decks from API using listDecks 
    // and updates 'decks' state using the 'setDecks'.
    const fetchDecks = async () => {
        const res = await listDecks();
        setDecks(res);
    };

    // useEffect is used to fetch the decks when the component mounts. 
    //effect only runs once-[]
    useEffect(() => {
        fetchDecks();
    }, []);

    return (
        <React.Fragment>
            {/* Switch is used to conditionally render different routes based on the current URL */}
            <Switch>
                {/* Route component for the home page */}
                <Route exact={true} path="/">
                    {/* renders a button to create a new deck  */}
                    <Link to="/decks/new"><button>Create Deck</button></Link>
                    {/* maps over the decks array to render a DeckSummary component for each deck. */}
                    {decks.map((deck) => (
                        <DeckSummary key={deck.id} deck={deck} fetchDecks={fetchDecks} />
                    ))}
                </Route>

                {/* Route for creating a new deck */}
                <Route path="/decks/new">
                    {/* It renders CreateDeck and passes current 
                    deckCount and fetchDecks function as props. */}
                    <CreateDeck deckCount={decks.length} fetchDecks={fetchDecks} />
                </Route>

                {/* Route is for individual decks */}
                <Route path="/decks/:deckId">
                    {/*  renders Decks and passes decks array and fetchDecks function as props. */}
                    <Decks decks={decks} fetchDecks={fetchDecks} />
                </Route>

            </Switch>
        </React.Fragment>
    );
};

export default Home;

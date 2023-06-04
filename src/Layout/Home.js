import React, { useState, useEffect } from "react";
import DeckEntry from "./DeckEntry";
import { listDecks } from "../utils/api/index";
import { Switch, Route, Link } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";

const Home = () => {
    const [decks, setDecks] = useState([]);


    const fetchDecks = async () => {
        const res = await listDecks();
        setDecks(res);
    };

    useEffect(() => {
        fetchDecks();
    }, []);

    return (
        <React.Fragment>
            <Switch>
                <Route exact={true} path="/">
                    <Link to="/decks/new"><button>Create Deck</button></Link>
                    {decks.map((deck) => (
                        <DeckEntry key={deck.id} deck={deck} fetchDecks={fetchDecks} />
                    ))}
                </Route>

                <Route path="/decks/new"><CreateDeck deckCount={decks.length} fetchDecks={fetchDecks} /></Route>

                <Route path="/decks/:deckId"><Decks decks={decks} fetchDecks={fetchDecks} /></Route>

            </Switch>
        </React.Fragment>
    );
};

export default Home;

import React, { useState, useEffect } from "react";
import DeckSummary from "./DeckSummary";
import { listDecks } from "../utils/api/index";
import { Switch, Route, Link } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Decks from "./Decks";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  const [decks, setDecks] = useState([]);

  const fetchDecks = async () => {
    const res = await listDecks();
    setDecks(res);
  };

  useEffect(() => {
    fetchDecks();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Link to="/decks/new">
              <button>Create Deck</button>
            </Link>
            {decks.map((deck) => (
              <DeckSummary key={deck.id} deck={deck} fetchDecks={fetchDecks} />
            ))}
          </Route>

          <Route path="/decks/new">
            <CreateDeck deckCount={decks.length} fetchDecks={fetchDecks} />
          </Route>

          <Route path="/decks/:deckId">
            <Decks decks={decks} fetchDecks={fetchDecks} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
        {/* TODO: Implement the screen starting here */}
      </div>
    </>
  );
}

export default Layout;

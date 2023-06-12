//import react and necessary hooks
import React, { useState, useEffect } from "react";
// Import necessary components from react-router-dom
import { Switch, Route, Link } from "react-router-dom";
//import API functions
import { listDecks } from "../utils/api/index";
//import custom components
import CreateDeck from "./CreateDeck";
import DeckSummary from "./DeckSummary";
import Decks from "./Decks";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  // deck state initialized using useState hook. 
  // represents the list of decks. 
  // initialized set to an empty array.
  const [decks, setDecks] = useState([]);

  //fetch the list of decks using the listDecks function from ../utils/api/index
  const fetchDecks = async () => {
    const res = await listDecks();
    // fetched deck data is stored in the decks state using the setDecks function.
    setDecks(res);
  };

  // useEffect hook is used to call the fetchDecks when component first renderes. 
  //  Ensures list of decks is fetched and stored in state.
  useEffect(() => {
    fetchDecks();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {/* Within the <Switch> component, different
         <Route> components are defined to handle different routes */}
        <Switch>
          {/* exact path renders homne page */}
          <Route exact={true} path="/">
            {/* a button for creating a new deck is displayed using
           the Link component from react-router-dom */}
            <Link to="/decks/new">
              <button>Create Deck</button>
            </Link>
            {/* The decks.map is used to render DeckSummary components for each deck 
            in the decks state, passing the deck object and the fetchDecks function as props. */}
            {decks.map((deck) => (
              <DeckSummary key={deck.id} deck={deck} fetchDecks={fetchDecks} />
            ))}
          </Route>

          {/* renders the CreateDeck component, passing the decks.
          length and the fetchDecks function as props. */}
          <Route path="/decks/new">
            <CreateDeck deckCount={decks.length} fetchDecks={fetchDecks} />
          </Route>

          {/* renders the Decks component, passing the decks state
           and the fetchDecks function as props. */}
          <Route path="/decks/:deckId">
            <Decks decks={decks} fetchDecks={fetchDecks} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
        {/* <Switch> component ensures that only one route is rendered 
        at a time based on the current URL. */}
      </div>
    </>
  );
}

export default Layout;

import React from "react";
// Import necessary components from react-router-dom
import { Switch, useRouteMatch, Route, } from "react-router-dom";
//import custom components
import CardForm from "./CardForm";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import Study from "./Study";


//Decks component accpets fetchDecks as a prop.
const Decks = ({ fetchDecks }) => {
    // useRouteMatch hook gets the current route's match info, specifically the path value. 
    // This value represents the base path for the nested routes in the Decks component.
    const { path } = useRouteMatch();

    return (
        // Switch component, which is used to render the first matching Route among its children.
        // Each Route corresponds to a specific path under the base path of the Decks component.
        <Switch>
            {/* First Route has an exact prop set to true and matches the base path exactly
             It renders the Deck component and passes the fetchDecks prop to it. */}
            <Route exact={true} path={`${path}`}>
                <Deck fetchDecks={fetchDecks} />
            </Route>
            {/* The other Route components handle specific paths under the base path. 
            They render different components: Study, EditDeck, CardForm, and CardForm (again). 
            Each of these components may have their own specific functionality related 
            to the nested routes. */}
            <Route path={`${path}/study`}>
                <Study />
            </Route>
            <Route path={`${path}/edit`}>
                <EditDeck fetchDecks={fetchDecks} />
            </Route>
            <Route path={`${path}/cards/new`}>
                <CardForm fetchDecks={fetchDecks} />
            </Route>
            <Route path={`${path}/cards/:cardId/edit`}>
                <CardForm fetchDecks={fetchDecks} />
            </Route>
            {/* All the nested Route components are rendered inside the Switch,
             ensuring that only one matching route is rendered at a time. */}
        </Switch>
    );
};

export default Decks;

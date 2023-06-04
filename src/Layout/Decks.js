import React from "react";
import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import CardForm from "./CardForm";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import Study from "./Study";

const Decks = ({ fetchDecks }) => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact={true} path={`${path}`}>
                <Deck fetchDecks={fetchDecks} />
            </Route>
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
        </Switch>
    );
};

export default Decks;

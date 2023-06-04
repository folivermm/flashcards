import React, { useEffect, useState } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
import CardEntry from "./CardEntry";

const Deck = ({ fetchDecks }) => {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();

    const getDeck = async () => {
        const res = await readDeck(deckId);
        setDeck(res);
    };

    const handleDelete = async () => {
        if (
            window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
        ) {
            await deleteDeck(deckId);
            await fetchDecks();
            history.push("/");
        }
    };

    useEffect(() => {
        getDeck();
    }, []);

    if (deck.name) {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <Link to="/">Home</Link> / {deck.name}
                    </p>
                </div>

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

                <section>
                    <h2>Cards</h2>
                    {deck.cards.map(card => <CardEntry key={card.id} card={card} getDeck={getDeck} />)}
                </section>
            </React.Fragment>
        );
    }

    return <h2>Loading...</h2>;
};

export default Deck;

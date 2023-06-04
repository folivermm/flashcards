import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

const Study = () => {
    const [deck, setDeck] = useState({});
    const [cardCounter, setCardCounter] = useState(1);
    const [flipped, setFlipped] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();

    const fetchDeck = async () => {
        const res = await readDeck(deckId);
        setDeck(res);
    };

    const handleNext = () => {
        // if last card, ask modal
        if (cardCounter === deck.cards.length) {
            if (
                window.confirm(
                    "Restart cards?\n\nClick 'cancel' to return to the home page."
                )
            ) {
                setCardCounter(1);
            } else {
                history.push("/");
            }
        } else {
            setFlipped(false);
            setCardCounter((prevCount) => prevCount + 1);
        }
    };

    useEffect(() => {
        fetchDeck();
    }, []);

    if (deck.cards) {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <Link to="/">Home</Link> / {deck.name} / Study
                    </p>
                </div>

                <section>
                    <h2>
                        Study: <span>{deck.name}</span>
                    </h2>
                    <article>
                        {deck.cards.length > 2 && (
                            <React.Fragment>
                                <h3>
                                    Card {cardCounter} of {deck.cards.length}
                                </h3>
                                <p>
                                    {flipped
                                        ? deck.cards[cardCounter - 1].back
                                        : deck.cards[cardCounter - 1].front}
                                </p>
                                <span>
                                    <button onClick={() => setFlipped(!flipped)}>Flip</button>

                                    {flipped && (
                                        <button onClick={handleNext}>
                                            {cardCounter === deck.cards.length ? "Restart" : "Next"}
                                        </button>
                                    )}
                                </span>
                            </React.Fragment>
                        )}

                        {deck.cards.length <= 2 && (
                            <React.Fragment>
                                <h3>Not enough cards.</h3>
                                <p>
                                    You need at least 3 cards to study. There are{" "}
                                    {deck.cards.length} cards in this deck.
                                </p>

                                <button
                                    onClick={() =>
                                        history.push(url.replace("study", "cards/new"))
                                    }
                                >
                                    + Add Cards
                                </button>
                            </React.Fragment>
                        )}
                    </article>
                </section>
            </React.Fragment>
        );
    }

    return <h2>Loading...</h2>;
};

export default Study;

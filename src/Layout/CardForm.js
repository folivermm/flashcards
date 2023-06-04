import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

const CardForm = ({ type, fetchDecks }) => {
    const initialForm = {
        front: "",
        back: "",
        id: "",
    };
    const [formData, setFormData] = useState({ ...initialForm });
    const [deck, setDeck] = useState({});
    const history = useHistory();
    const { deckId } = useParams();
    const { cardId } = useParams();

    const getDeck = async () => {
        const res = await readDeck(deckId);
        setDeck(res);

        if (cardId) {
            const card = await readCard(cardId);
            setFormData({ ...card });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const { front, back } = formData;

        if (!(front && back)) {
            alert("Please fill in all boxes");
        }

        if (!cardId) {
            await createCard(deckId, { front, back });
        } else {
            await updateCard(formData);
        }

        await fetchDecks();
        history.push(`/decks/${deckId}`);
    };

    useEffect(() => {
        getDeck();
    }, []);

    return (
        <React.Fragment>
            <div>
                <p>
                    <Link to="/">Home</Link>{" "}
                    {`/ ${deck.name} /`} <span>{`${cardId ? "Edit Card" : "Add Card"} `}</span>
                </p>
            </div>

            <section>
                <h2><span>{`${deck.name}`}</span>: {`${cardId ? "Edit Card" : "Add Card"} `}</h2>
                <article>
                    <label>Front</label>
                    <br />

                    <textarea
                        name="front"
                        value={formData.front}
                        onChange={handleChange}
                        placeholder="Front side of card."
                    />
                    <br />

                    <label>Back</label>
                    <br />
                    <textarea
                        name="back"
                        value={formData.back}
                        onChange={handleChange}
                        placeholder="Back side of card." />

                    <br />

                    <span>
                        <Link to={`/decks/${deckId}`}>
                            <button>{cardId ? "Cancel" : "Done"}</button>
                        </Link>

                        <button onClick={handleSubmit}>
                            {cardId ? "Submit" : "Save"}
                        </button>
                    </span>
                </article>
            </section>
        </React.Fragment>
    );
};

export default CardForm;
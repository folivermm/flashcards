import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";

const EditDeck = ({ fetchDecks }) => {
    const initialForm = {
        name: "",
        description: "",
        id: "",
    };

    const [formData, setFormData] = useState({ ...initialForm });
    const [deck, setDeck] = useState({});
    const history = useHistory();
    const { deckId } = useParams();

    const getDeck = async () => {
        const res = await readDeck(deckId);

        const { name, description, id } = res;
        setDeck(res);
        setFormData({ name, description, id });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const { name, description, id } = formData;

        if (name && description && id) {
            await updateDeck(formData);
            await fetchDecks();

            setFormData({ ...initialForm });
            setDeck({});
            history.push(`/decks/${id}`);
        } else {
            alert("Please fill in all boxes");
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
                        <Link to="/">Home</Link> / {deck.name} / Edit Deck
                    </p>
                </div>

                <section>
                    <h2>Edit Deck</h2>
                    <article>
                        <label>Name</label>
                        <br />

                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Description</label>
                        <br />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <br />

                        <span>
                            <Link to={`/decks/${deckId}`}>
                                <button>Cancel</button>
                            </Link>

                            <button onClick={handleSubmit}>Submit</button>
                        </span>
                    </article>
                </section>
            </React.Fragment>
        );
    }

    return <h2>Loading...</h2>;
};

export default EditDeck;
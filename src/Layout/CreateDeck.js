import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

const CreateDeck = ({ deckCount, fetchDecks }) => {
    const initialForm = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({ ...initialForm });
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const { name, description } = formData;

        if (name && description) {
            const id = deckCount + 1;

            await createDeck(formData);
            await fetchDecks();

            setFormData({ ...initialForm });
            history.push(`/decks/${id}`);
        } else {
            alert("Please fill in all boxes");
        }
    };

    return (
        <React.Fragment>
            <div>
                <p>
                    <Link to="/">Home</Link> / Create Deck
                </p>
            </div>

            <section>
                <h2>Create Deck</h2>
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
                        <Link to="/">
                            <button>Cancel</button>
                        </Link>

                        <button onClick={handleSubmit}>Submit</button>
                    </span>
                </article>
            </section>
        </React.Fragment>
    );
};

export default CreateDeck;

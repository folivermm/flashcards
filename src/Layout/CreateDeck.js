//import react and necessary hooks
import React, { useState } from "react";
// Import necessary components from react-router-dom
import { Link, useHistory } from "react-router-dom";
//import API functions 
import { createDeck } from "../utils/api/index";

// EditDeck component accepts the deckCount and fetchDecks props.
const CreateDeck = ({ deckCount, fetchDecks }) => {
    //  initial form state is defined as an object with empty values for name and description.
    const initialForm = {
        name: "",
        description: "",
    };

    // formData state variable is declared using the useState hook. 
    // It represents the form data for creating a new deck.
    const [formData, setFormData] = useState({ ...initialForm });
    // useHistory hook is used to get the history object, which allows programmatic navigation.
    const history = useHistory();

    // handleChange is defined to handle changes in the form input fields.
    // It updates the formData state with the new values using the spread operator. 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // handleSubmit is defined to handle the form submission
    const handleSubmit = async () => {
        // It checks if the required fields (name and description) in the formData state are filled. 
        const { name, description } = formData;

        // If they are, it generates a unique id for the new deck by adding 1 to the deckCount prop.
        if (name && description) {
            const id = deckCount + 1;

            //  It then calls the createDeck API function to create a new deck with the form data.
            await createDeck(formData);
            //  fetches the updated deck list using fetchDecks.
            await fetchDecks();

            // resets the formData state to its initial values.
            setFormData({ ...initialForm });
            // redirects the user to the newly created deck's page.
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

            {/* renders the form for creating a new deck.
            It includes input fields for the deck's name and description,
            along with buttons to cancel or submit the creation. 
            The input fields are bound to the corresponding values in the formData state, 
            and the handleChange function is called on change events.*/}
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

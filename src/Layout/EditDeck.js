//import react and necessary hooks
import React, { useEffect, useState } from "react";
// Import necessary components from react-router-dom
import { Link, useHistory, useParams } from "react-router-dom";
//import API functions
import { updateDeck, readDeck } from "../utils/api/index";

// EditDeck component accepts the fetchDecks prop.
const EditDeck = ({ fetchDecks }) => {
    // The initial form state is defined as an object 
    // with empty values for name, description, and id.
    const initialForm = {
        name: "",
        description: "",
        id: "",
    };

    // useState hook delcares two state variables formData and deck.
    // fomrData represents the form data for editing the deck. 
    // while deck represents the fetched deck data.
    const [formData, setFormData] = useState({ ...initialForm });
    const [deck, setDeck] = useState({});
    // The useHistory is used to get the history object
    const history = useHistory();
    // useParams hooks is used to get the deckId parameter from the URL 
    const { deckId } = useParams();

    // getDeck function fetches the deck data based on the deckId parameter
    const getDeck = async () => {
        const res = await readDeck(deckId);

        const { name, description, id } = res;
        // It sets the deck state variable 
        setDeck(res);
        // and updates the formData state with 
        // the fetched deck's name, description, and id.
        setFormData({ name, description, id });
    };

    // handleChange function handles changes in the form input fields.
    // It updates the formData state with the new values using the spread operator.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // handleSubmit function is defined to handle the form submission. 
    // It checks if all the required fields
    // (name, description, and id) in the formData state are filled
    const handleSubmit = async () => {
        const { name, description, id } = formData;

        // If they are, it calls the updateDeck API function 
        if (name && description && id) {
            // updates the deck with the new data.
            await updateDeck(formData);
            // fetches the updated deck list using fetchDecks
            await fetchDecks();

            // resets the formData and deck states to their initial values.
            setFormData({ ...initialForm });
            setDeck({});
            // redirects the user to the deck's page
            history.push(`/decks/${id}`);
        } else {
            alert("Please fill in all boxes");
        }
    };

    // useEffect hook fetchs deck data when component mounts
    // or when deckId parameter changes and also calls getDeck()
    useEffect(() => {
        getDeck();
    }, [deckId]);

    // if the deck has a name (meaning the deck data has been fetched)
    if (deck.name) {
        return (
            <React.Fragment>
                <div>
                    <p>
                        <Link to="/">Home</Link> / {deck.name} / Edit Deck
                    </p>
                </div>

                {/*A form with input fields for the deck's name and description,
                along with buttons to cancel or submit the changes. 
                The input fields are bound to the corresponding values in the formData state.
                The handleChange function is called on change events. */}
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

    // If the deck name is not available yet, a loading message is displayed.
    return <h2>Loading...</h2>;
};

export default EditDeck;

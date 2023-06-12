// import react and necessary hooks
import React, { useEffect, useState } from "react";
// Import necessary components from react-router-dom
import { useHistory, useParams, Link } from "react-router-dom";
// import API functions 
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

// CardForm accepts 'type' and 'fetchDecks' props.
const CardForm = ({ type, fetchDecks }) => {
    // initialForm object represent the initial state of the form, 
    // it includes the front and back fields and the card's ID.
    const initialForm = {
        front: "",
        back: "",
        id: "",
    };
    // useState hook defines the formData state variable, initialized with the initialForm object.
    const [formData, setFormData] = useState({ ...initialForm });
    // useState hook defines deck state variable, represents the deck associated with the card.
    const [deck, setDeck] = useState({});
    //used to obtain the history object, which allows for programmatic navigation.
    const history = useHistory();
    // useParams hook is used to extract the deckId and cardId parameters from the route.
    const { deckId } = useParams();
    const { cardId } = useParams();

    // fetches the deck's data using the readDeck API function
    const getDeck = async () => {
        const res = await readDeck(deckId);
        setDeck(res);

        //If a cardId is provided, it also fetches the card's data 
        //using the readCard API function and sets the form data accordingly.
        if (cardId) {
            const card = await readCard(cardId);
            setFormData({ ...card });
        }
    };

    // handleChange function is defined to handle changes in the form inputs. 
    // It updates the formData state object based on the changed input value.
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // handleSubmit function is defined to handle form submission.
    const handleSubmit = async () => {
        const { front, back } = formData;

        // It validates that the front and back fields are not empty.
        if (!(front && back)) {
            alert("Please fill in all boxes");
        }

        // If validation passes
        if (!cardId) {
            //creates a new card 
            await createCard(deckId, { front, back });
        } else {
            // or updates an existing card using the appropriate API function.
            await updateCard(formData);
        }

        // fetches the updated deck list using the fetchDecks prop function.
        await fetchDecks();
        // redirects the user to the deck's page.
        history.push(`/decks/${deckId}`);
    };

    // useEffect hook is used to call the getDeck function when the deckId changes.
    useEffect(() => {
        getDeck();
    }, [deckId]);

    {/* The component conditionally renders different content 
    based on whether the deck's name is available or not.
    If the deck name is available, it renders the form */}
    return (
        <React.Fragment>
            <div>
                <p>
                    <Link to="/">Home</Link>{" "}
                    {`/ ${deck.name} /`} <span>{`${cardId ? "Edit Card" : "Add Card"} `}</span>
                </p>
            </div>

            {/* The component renders the form with input fields for the card's front and back.
              includes labels, placeholders, and event handlers for input changes.
              Nav links are provided to the home page and the deck's page using Link.
              The form includes buttons for canceling or submitting the form,
              with appropriate button text based on the cardId and type props. */}
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

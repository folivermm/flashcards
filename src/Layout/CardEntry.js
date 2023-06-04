import React from "react";
import { deleteCard } from "../utils/api/index";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";



const CardEntry = ({ card, getDeck }) => {
    const { url } = useRouteMatch()
    const handleDelete = async () => {

        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            await deleteCard()
            await getDeck()
        }
    }
    return (
        <article style={{ border: "solid 1px black" }}>
            <div>
                <p>{card.front}</p>
                <p>{card.back}</p>
            </div>
            <div>
                <Link to={`${url}/cards${card.id}/edit`}>
                    <button onClick={handleDelete}>Delete</button>
                </Link>
            </div>
        </article>
    )
}

export default CardEntry;

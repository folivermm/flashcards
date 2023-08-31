# Flash Cards

Flash Cards is a web application built using React that allows users to create, manage, and study decks of flashcards for various subjects. The application utilizes an API to perform operations such as creating, reading, updating, and deleting flashcards and decks. It also demonstrates effective state management across multiple components and incorporates routing for seamless navigation.

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the necessary dependencies:

   npm install

Start the development server using:

   npm start

### Highlights

Flash Cards showcases proficiency in the following areas:

   - MarkUp: Writing functional components in React.

   - Implementing routes, including nested routes, using React Router.

   - Utilizing React hooks such as useState(), useParams(), and useHistory () for efficient state management and navigation.

   - Debugging React code through console output and using the VS Code debugger.

### Application Screens 

The application features the following screens and their corresponding paths:

   - **Home: /**
        Displays a list of available decks with options to create, study, view, or delete a deck.

   - **Study: /decks/:deckId/study**
        Allows the user to study the flashcards from a specified deck.

   - **Create Deck: /decks/new**
        Enables the user to create a new deck.

   - **Deck: /decks/:deckId**
        Presents detailed information about a specific deck with options to edit or add cards, navigate to the study screen, or delete the deck.

   - **Edit Deck: /decks/:deckId/edit**
        Lets the user modify information on an existing deck.

   - **Add Card: /decks/:deckId/cards/new**
        Permits the user to add a new card to an existing deck.

   - **Edit Card: /decks/:deckId/cards/:cardId/edit**
        Allows the user to modify information on an existing card within a deck.

#### Acknowledgments

This project was developed as part of Thinkful software engineering program and showcases practical skills in building dynamic web applications using React and related technologies.
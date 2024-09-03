import { useState, createContext } from 'react';

const BookContext = createContext();

function BookProvider({ children, value }) {
    const [book, setBook] = useState[''];

    if (value) {
        setBook(book);
    }

    <BookContext.Provider value={book}>{children}</BookContext.Provider>;
}

export { BookContext, BookProvider };

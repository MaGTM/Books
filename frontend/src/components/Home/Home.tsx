import React from 'react';
import s from './Home.module.css'
import SearchBar from "./SearchBar/SearchBar";
import BooksList from "./BooksList/BooksList";

const Home = () => {
    return (
        <div className={s.content}>
            <SearchBar />
            <BooksList />
        </div>
    );
};

export default Home;
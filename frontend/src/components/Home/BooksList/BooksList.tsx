import React, {useEffect, useState} from 'react';
import axios from "axios";
import {IBook} from "../../../models/Interfaces/IBook";

import s from './BooksList.module.css'

import BookItem from "./BookItem/BookItem";
import {useInView} from "react-intersection-observer";

const BooksList = () => {
    let [isLoading, setIsLoading] = useState<boolean>(false)
    let [books, setBooks] = useState<IBook[]>([])
    const { ref, inView } = useInView({
        skip: isLoading
    });

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=a&maxResults=18`)
            .then((res) => {
                setBooks(res.data.items)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if(inView) {
            setIsLoading(true)
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=a&maxResults=18&startIndex=${books.length+1}`)
                .then((res) => {
                    setBooks(prevState => {
                        return [...prevState, ...res.data.items]
                    })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [inView])
    return (
        <>
            <div className={s.content}>
                {books && books.map(book => {

                    return <BookItem id={book.id}
                                     authors={book.volumeInfo.authors }
                                     title={book.volumeInfo.title}
                                     categories={book.volumeInfo.categories}
                                     smallThumbnail={book.volumeInfo.imageLinks.thumbnail}
                                     size={'big'}
                                     key={book.id}
                    />
                })}
                {isLoading && <div>LOADING</div>}
                <div ref={ref} id={s.observer}/>
            </div>
        </>
    );
};

export default BooksList;
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './Book.module.css'
import {useNavigate, useSearchParams} from "react-router-dom";
import {IBook} from "../../../models/Interfaces/IBook";
import axios from "axios";
import {Rating} from "../../../models/Classes/Rating";

const Book = () => {
    const [searchParams] = useSearchParams();

    let [isLoading, setIsLoading] = useState<boolean>(false)
    let [book, setBook] = useState<IBook>()
    let navigate = useNavigate()

    let rating = useMemo(() => {
        return new Rating(book?.volumeInfo.averageRating ? book?.volumeInfo.averageRating : 0)
    }, [book])

    useEffect(() => {
        setIsLoading(true)
        axios.get<IBook>(`https://www.googleapis.com/books/v1/volumes/${searchParams.get('id')}`)
            .then((res) => {
                setBook(res.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className={s.content}>
            {isLoading ? <div>LOADING</div> :
                <>
                    <img
                        src={book?.volumeInfo.imageLinks.thumbnail}
                        alt="book preview"/>
                    <div className={s.bookInfo}>
                        <h1>{book?.volumeInfo.title}</h1>
                        <div className={s.authors}>
                            {book?.volumeInfo.authors && book?.volumeInfo.authors.map((item, index) => {
                                return <h2 key={index}>{item}</h2>
                            })}
                        </div>
                        <div className={s.rating}>
                            {rating.getStars().map((item, index) => {
                                return <img src={item.logo} alt="star rating" key={index}/>
                            })}
                        </div>
                        <div className={s.categories}>
                            {book?.volumeInfo.categories && book?.volumeInfo.categories.map((item, index) => {
                                return <span key={index}>{item}</span>
                            })}
                        </div>
                        <div className={s.description}>
                            <h3>Description:</h3>
                            {book?.volumeInfo.description}
                        </div>
                    </div>
                    <div onClick={() => navigate(-1)} id={s.back}>
                        <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 18C8 18 3 12.131 0.999999 9.5L8 0.999999" stroke="#043C6A" strokeLinecap="round"/>
                        </svg>

                    </div>
                </>
            }

        </div>
    );
};

export default Book;
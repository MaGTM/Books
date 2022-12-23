import React, {FC} from 'react';
import s from './BookItem.module.css'
import {useNavigate} from "react-router-dom";

interface BookItemProps {
    title: string,
    id: string,
    smallThumbnail: string,
    authors: string[] | undefined,
    categories: string[] | undefined,
    size: 'big' | 'small'
}

const BookItem: FC<BookItemProps> = ({title, id, authors, categories, smallThumbnail, size}) => {
    let navigate = useNavigate()

    let clickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        navigate(`book?id=${id}`)
    }

    return (
        <div className={s.content + ' ' + (size === 'small' ? s.small : '')} onClick={clickHandler}>
            <img src={smallThumbnail} alt="book thumbnail"/>
            <div className={s.bookInfo}>
                <h2>{title}</h2>
                <div className={s.authors}>
                    {authors && authors.map((item, index) => {
                        return <h3 key={index}>{item}</h3>
                    })}
                </div>
                <div className={s.categories}>
                    {categories && categories.map((item, index)=> {
                        return <span key={index}>{item}</span>
                    })}
                </div>
            </div>
        </div>
    );
};

export default BookItem;
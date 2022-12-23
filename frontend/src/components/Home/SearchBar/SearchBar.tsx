import React, {useEffect, useState} from 'react';
import s from './SearchBar.module.css'
import {ReactComponent as Search} from "../../../assets/icons/Search.svg";
import {ReactComponent as Close} from "../../../assets/icons/Close.svg";
import {useDebounce} from "../../../assets/hooks/useDebounce";
import axios from "axios";
import BookItem from "../BooksList/BookItem/BookItem";
import {IBook} from "../../../models/Interfaces/IBook";

const SearchBar = () => {
    let [searchValue, setSearchValue] = useState<string>('')
    let [results, setResults] = useState<IBook[]>([])
    let [isShow, setIsShow] = useState(false)
    let [isLoading, setIsLoading] = useState<boolean>(false)

    let debouncedSearchValue = useDebounce(searchValue, 300)

    let clearHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        setResults([])
        setSearchValue('')
    }

    useEffect(() => {
        if(!debouncedSearchValue) setResults([])
        if(debouncedSearchValue) {
            setIsLoading(true)
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchValue}&maxResults=5`)
                .then((res) => {
                    setResults(res.data.items ? res.data.items : [])
                    setIsShow(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [debouncedSearchValue])

    let blurHandler = (e: React.FocusEvent) => {
        setTimeout(() => {
            setIsShow(false)
        }, 100)

    }

    return (
        <div className={s.content}>
            <label id={s.searchBar}>
                <Search id={s.magnifier}/>
                <input type="text"
                       placeholder={'Search...'}
                       value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       onFocus={() => setIsShow(true)}
                       onBlur={blurHandler}
                />
                <Close id={s.close} onClick={clearHandler}/>
            </label>
            {(results.length && isShow) ?
                <div className={s.dropdown}>
                    {results.map(item => {
                        return <BookItem
                            id={item.id}
                            authors={item.volumeInfo.authors}
                            title={item.volumeInfo.title}
                            categories={item.volumeInfo.categories}
                            smallThumbnail={item.volumeInfo.imageLinks.thumbnail}
                            size={'small'}
                            key={item.id}
                        />
                    })}
                </div> : ''
            }
        </div>
    );
};

export default SearchBar;
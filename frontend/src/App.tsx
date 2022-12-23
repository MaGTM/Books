import React from 'react';
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Book from "./components/Home/Book/Book";

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'book'} element={<Book />}/>
            </Routes>
        </div>
    );
}

export default App;

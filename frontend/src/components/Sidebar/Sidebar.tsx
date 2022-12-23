import React from 'react';
import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import {ReactComponent as Home} from "../../assets/icons/Home.svg";

const Sidebar = () => {
    return (
        <aside className={s.content}>
            <nav className={s.sidebarMenu}>
                <ul>
                    <li><NavLink to={'/'} className={({isActive}) => isActive ? s.active : ''}><Home /></NavLink></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
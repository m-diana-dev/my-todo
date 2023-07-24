import React from 'react';
import s from './Header.module.css'
export const Header = () => {
    return (
        <header className={s.header}>
            <div className="container">
                <h1><span>📄</span>TodoList</h1>
            </div>
        </header>
    );
};

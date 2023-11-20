import React, {memo} from 'react';
import s from './Header.module.css'
import {Button} from "../Button/Button";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {logoutTC} from "../../reducers/auth-reducer";
import {useSelector} from "react-redux";
export const Header = memo(() => {
    console.log('Header rendered')
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

    const onClickHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.headerWrapp}>
                    <h1><span>📄</span>TodoList</h1>
                    {isLoggedIn && <Button callback={onClickHandler} transparent={true}>LogOut</Button>}
                </div>
            </div>
        </header>
    );
})

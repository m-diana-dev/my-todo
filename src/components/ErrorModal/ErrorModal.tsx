import React, {useEffect, useState} from 'react'
import s from './ErrorModal.module.css'
import {Button} from "../Button/Button";
import errorImg from '../../image/error.png'
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../reducers/store";
import {SetAppErrorAC} from "../../reducers/app-reducer";
export const ErrorModal = () => {
    const error = useSelector<AppStateType, string>(state => state.app.error)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        setTimeout(()=>{
            handleClose()
        }, 6000)
        console.log('useEffect')
    }, [error])

    const handleClose = () => {
        dispatch(SetAppErrorAC(''))
    }

    const modalOpen = error ? '' : s.hide
    return (
        <div className={s.modal + ' ' + modalOpen}>
            <div className={s.modalTop}>
                <img src={errorImg}/>
                <span className={s.title}>Error!</span>
            </div>
            <p>{error}</p>
            <Button onClick={handleClose}>Dismiss</Button>
        </div>
    )
}

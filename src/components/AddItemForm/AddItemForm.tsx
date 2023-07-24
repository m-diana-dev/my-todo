import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button/Button";
import add from "../../image/add.svg";
import s from './AddItemForm.module.css'


type AddItemFormPropsType = {
    addTitle: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('');
    const OnChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value);
        setError('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            OnAddTitleHandler();
        }
    }
    const OnAddTitleHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTitle(inputTitle.trim())
            setInputTitle('');
        } else {
            setError('Error');
        }
    }

    const inputStyle = 'input' + ' ' + (error ? 'errorInput' : '') + ' ' + s.inputWidth;
    return (
        <div className={s.AddItemForm}>
            <input className={inputStyle} type="text" onChange={OnChangeInputHandler}
                   onKeyDown={onKeyDownHandler}
                   value={inputTitle}/>
            <Button callback={OnAddTitleHandler} round={true}>
                <img src={add} alt="icon"/>
            </Button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    );
};

import React, {ChangeEvent, memo, useState} from 'react';
import s from "./EditableSpan.module.css";
import {Input} from "../Input/Input";

type EditableSpanPropsType = {
    title: string
    disabled?: boolean
    onChange:(title: string)=>void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [modeInput, setModeInput] = useState(false);
    const [inputTitle, setInputTitle] = useState(props.title);
    const onDoubleClickHandler = () => {
        if(!props.disabled){
            setModeInput(true);
        }
    }
    const onBlurHandler = () => {
        setModeInput(false);
        props.onChange(inputTitle)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    const inputStyle = s.inputWidth;

    return (
        modeInput
            ? <Input style={inputStyle} autoFocus onBlur={onBlurHandler} value={inputTitle} onChange={onChangeHandler}/>
            : <span className={s.inputWidth} onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
})

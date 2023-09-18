import React, {ChangeEvent, memo, useState} from 'react';
import s from "./EditableSpan.module.css";

type EditableSpanPropsType = {
    title: string
    onChange:(title: string)=>void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan rendered')
    const [modeInput, setModeInput] = useState(false);
    const [inputTitle, setInputTitle] = useState(props.title);
    const onDoubleClickHandler = () => {
        setModeInput(true);
    }
    const onBlurHandler = () => {
        setModeInput(false);
        props.onChange(inputTitle)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    const inputStyle = 'input' + ' ' + s.inputWidth;
    return (
        modeInput
            ? <input className={inputStyle} autoFocus onBlur={onBlurHandler} value={inputTitle} onChange={onChangeHandler}/>
            : <span className={s.inputWidth} onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
})

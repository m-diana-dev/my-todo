import React, {ComponentProps} from 'react';
import s from './Input.module.css'

export type InputPropsType = {
    error?: boolean
    style?: string
} & ComponentProps<'input'>
export const Input: React.FC<InputPropsType> = (props) => {
    const {error, style, ...restProps} = props

    const inputStyle = s.input + ' ' + (error ? s.errorInput : '') + ' ' + style;
    return (
        <input {...restProps} className={inputStyle}/>
    );
};
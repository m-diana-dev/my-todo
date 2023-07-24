import React from 'react';
import s from './Button.module.css'

type BtnPropsType = {
    name?: string
    callback: () => void
    round?: boolean
    active?: boolean
    className?: string
    children?: React.ReactNode
}
export const Button = (props: BtnPropsType) => {
    const buttonStyle = s.button + ' ' + (props.round ? s.round : '') + (props.active ? s.activeFilter : '')
    return (
        <button onClick={props.callback} className={buttonStyle}>{props.name}{props.children}</button>
    );
};

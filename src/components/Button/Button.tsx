import React, {memo} from 'react';
import s from './Button.module.css'

export type BtnPropsType = {
    callback: () => void
    round?: boolean
    active?: boolean
    className?: string
    children?: React.ReactNode
    disabled?: boolean
}
export const Button = memo((props: BtnPropsType) => {
    const buttonStyle = s.button + ' ' + (props.round ? s.round : '') + (props.active ? s.activeFilter : '')
    return (
        <button onClick={props.callback} disabled={props.disabled} className={buttonStyle}>{props.children}</button>
    );
})

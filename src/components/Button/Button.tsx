import React, {ComponentProps, memo} from 'react';
import s from './Button.module.css'

export type BtnPropsType = {
    round?: boolean
    active?: boolean
    children?: React.ReactNode
    transparent?: boolean
    // className?: string


    // disabled?: boolean
    // callback: () => void
} & ComponentProps<'button'>
export const Button: React.FC<BtnPropsType> = memo((props) => {
    const{round,active, children, transparent,  ...restProps} = props;

    const buttonStyle = s.button + ' ' + (round ? s.round : '') + (active ? s.activeFilter : '') + (transparent ? s.transparent : '')
    return (
        <button {...restProps} className={buttonStyle}>{children}</button>
    );
})

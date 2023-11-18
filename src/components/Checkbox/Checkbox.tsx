import React, {ChangeEvent} from 'react';
import {Input} from "../Input/Input";
import s from './Checkbox.module.css'


type CheckboxPropsType = {
    label?: string
    checked?: boolean
    disabled?: boolean
    style?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox: React.FC<CheckboxPropsType> = (props) => {
    const {label, checked, disabled, style, onChange} = props
    return (
        <div className={s.checkbox + ' ' + style}>
            <Input style={s.checkboxInput} type="checkbox"
                   checked={checked}
                   onChange={onChange} disabled={disabled}/>
            <label className={s.checkboxLabel}>{label}</label>
        </div>
    );
};
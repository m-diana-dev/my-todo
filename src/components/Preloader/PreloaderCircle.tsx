import React from 'react';
import preloader from "../../image/loading.svg";
import s from './PreloaderCircle.module.css'

export const PreloaderCircle = () => {
    return (
        <div className={s.PreloaderCircle}>
            <img src={preloader} alt="loading"/>
        </div>
    );
};

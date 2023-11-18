import React from 'react';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import s from './Login.module.css'

export const Login = () => {
    return (
        <div className={s.loginPage}>
            <div className="container">
                <h1 className={s.title}>Login</h1>
                <p>
                    <span>To log in get registered </span>
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}>here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
                <form action="">
                    <Input placeholder={'Email'}/>
                    <Input placeholder={'Password'}/>
                    <Button callback={() => {
                    }}>Login</Button>
                </form>
            </div>
        </div>
    );
};
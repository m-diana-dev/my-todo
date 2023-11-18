import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {TodoLists} from "./components/TodoLists/TodoLists";
import {Preloader} from "./components/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "./reducers/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorModal} from "./components/ErrorModal/ErrorModal";
import {Login} from "./components/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "./components/Error404/Error404";


function App() {
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            {appStatus === 'loading' && <Preloader/>}
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TodoLists/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<Error404/>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </BrowserRouter>
            <ErrorModal/>
        </div>
    );
}

export default App;

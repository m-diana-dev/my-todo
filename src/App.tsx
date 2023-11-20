import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {TodoLists} from "./components/TodoLists/TodoLists";
import {Preloader} from "./components/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./reducers/store";
import {initializeAppTC, RequestStatusType} from "./reducers/app-reducer";
import {ErrorModal} from "./components/ErrorModal/ErrorModal";
import {Login} from "./components/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Error404} from "./components/Error404/Error404";
import preloader from './image/loading.svg'
import {PreloaderCircle} from "./components/Preloader/PreloaderCircle";


function App() {
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <PreloaderCircle/>
    }

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

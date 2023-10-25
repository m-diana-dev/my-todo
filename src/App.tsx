import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {TodoLists} from "./components/TodoLists/TodoLists";
import {Preloader} from "./components/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "./reducers/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorModal} from "./components/ErrorModal/ErrorModal";


function App() {
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            {appStatus === 'loading' && <Preloader/>}
            <Header/>
            <TodoLists/>
            <ErrorModal/>
        </div>
    );
}

export default App;

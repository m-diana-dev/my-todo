import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {TodoLists} from "./components/TodoLists/TodoLists";

function App() {
    return (
        <div className="App">
            <Header/>
            <TodoLists/>
        </div>
    );
}

export default App;

import React from 'react';
import './App.scss';
import {Navbar} from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand>NutritionDiary</Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default App;

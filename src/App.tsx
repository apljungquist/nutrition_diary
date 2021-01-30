import React from 'react';
import './App.scss';
import {Nav, Navbar} from 'react-bootstrap';
import * as model from './model';
import FoodsPage from './components/Foods';

function App() {
    return (
        <div className="App">
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand>NutritionDiary</Navbar.Brand>
                <Nav>
                    <Nav.Link href="#foods">Foods</Nav.Link>
                </Nav>
            </Navbar>
            <FoodsPage defaultFoods={model.sample_foods}/>
        </div>
    );
}

export default App;

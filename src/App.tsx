import React from 'react';
import './App.scss';
import {Container, Nav, Navbar} from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Container>
                <Navbar expand="lg" variant="light" bg="light">
                    <Navbar.Brand href="#">NutritionDiary</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#fast">Fast</Nav.Link>
                        <Nav.Link href="#eat">Eat</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
        </div>
    );
}

export default App;

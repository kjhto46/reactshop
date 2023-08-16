import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import dataShoes from "./data.js";

function App() {
  let [shoes] = useState(dataShoes);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">리엑트쇼핑</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">장바구니</Nav.Link>
            <Nav.Link href="#pricing">결제</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <div className="row">
        {shoes.map((a, i) => {
          return <Card shoes={a} i={i + 1} key={i}></Card>;
        })}
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-3">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        alt="신발2"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

export default App;

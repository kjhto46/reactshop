import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import dataShoes from "./data.js";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from "./routes/Cart";

export let Context1 = createContext()

function App() {
  let obj = {name : 'kim'}
  
  localStorage.setItem('data', JSON.stringify(obj))

  let [shoes, setShoes] = useState(dataShoes);
  let [재고] = useState([10, 11, 12]);
  let navigate = useNavigate();
  let [watchedList, setWatchedList] = useState(()=>{
    let watchList = localStorage.getItem('watched');
    return watchList ? JSON.parse(watchList) : [];
  })
  useEffect(() => {
    const watchList = localStorage.getItem('watched');
    if (watchList) {
      setWatchedList(JSON.parse(watchList));
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            리엑트쇼핑
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              상세보기
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              장바구니
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={a} i={i + 1} key={i}></Card>;
                })}
              </div>
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=> {
                console.log(result.data)
                let copy = [...shoes, ...result.data];
                setShoes(copy);
                })
                .catch(()=>{
                  console.log('데이터 실패함')
                })
              }} >더보기</button>
              <ul>
                <li>최근 본 항목</li>
                {watchedList.map((a, i) => {

                  const foundShoe = shoes.find(shoe => shoe.id === a);

                  const nameToDisplay = foundShoe ? foundShoe.title : "";
                  return <li key={i}>
                    <a href={"/detail/" + a}>
                    {nameToDisplay}
                    </a>
                  </li>
                })}
              </ul>
            </>
          }
        />
        <Route path="/detail/:id" element={
        <Context1.Provider value={{재고, shoes}}>
          <Detail shoes={shoes} />
        </Context1.Provider>
        } />
        <Route path="/about" element={<About />}>
          <Route
            path="member"
            element={
              <>
                <h4>맴버</h4>
              </>
            }
          />
          <Route
            path="location"
            element={
              <>
                <h4>위치</h4>
              </>
            }
          />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404 없는페이지임</div>} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>회사 정보</h2>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-3">
      <a href={"/detail/" + (props.i - 1) }>
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        alt={"신발" + props.i}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      </a>
    </div>
  );
}

export default App;

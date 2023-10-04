import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context1 } from "./../App.js";
import { addItem } from "../store/cartSlice.js";
import { useDispatch } from "react-redux";

// import styled from "styled-components";

// let YellowBtn = styled.button`
//   font-size: 20px;
//   color: ${(props) => props.color};
// `;

/**
 * 과거 방식으로 컴포넌트 생성과 Lifecycle
 * componentDidMount(){} //컴포넌트 mount시 여기 코드 실행
 * componentDidUpdate(){} //컴포넌트 update시 여기 코드 실행
 * componentWillUnmount(){} //컴포넌트 unmount시 여기 코드 실행
 *
 * 요즘은 useEffect() hook으로 작업이 손쉽게 가능
 */
// class Detail2 extends React.Component {
//   componentDidMount() {}
//   componentDidUpdate() {}
//   componentWillUnmount() {}
// }

function Detail(props) {
  let dispatch = useDispatch();

  let [popalert, popsetAlert] = useState(true);
  let [num, setNum] = useState("");
  let [showtxt, setShowtxt] = useState(false);

  let [tabSw, setTabSw] = useState(0);

  useEffect(() => {
    if (isNaN(num) === true) {
      setShowtxt(true);
    } else if (isNaN(num) === false) {
      setShowtxt(false);
    }
  }, [num]);

  useEffect(() => {
    let a = setTimeout(() => {
      popsetAlert(false);
    }, 3000);

    return () => {
      clearTimeout(a);
    };
    // 이런식의 코드는 useEffect 동작하기 전에 특정코드를 실행하고 싶으면 return ()=>{} 안에 넣을 수 있다.
    // 이걸 clean up function이라고 부른다.
    // setTimeout() 쓸 때마다 브라우저 안에 타이머가 하나 생깁니다.
    // 근데 useEffect 안에 썼기 때문에 컴포넌트가 mount 될 때 마다 실행됩니다.
    // 그럼 잘못 코드를 짜면 타이머가 100개 1000개 생길 수도 있겠군요.
    // 나중에 그런 버그를 방지하고 싶으면useEffect에서 타이머 만들기 전에 기존 타이머를 싹 제거하라고 코드를 짜면 되는데
    // 그런거 짤 때 return ()=>{} 안에 짜면 됩니다.
    // // return ()=>{
    // // 기존타이머는 제거 해주세요~.
    // // }
  }, []);

  // 현재 url에 입력한 숫자
  let { id } = useParams();
  let 찾는상품 = props.shoes.find((배열자료) => {
    return 배열자료.id === id;
  });

  return (
    <div className="container">
      {찾는상품 ? (
        <div className="row">
          {popalert ? (
            <div className="alert alert-warning">3초 이내 구입시 할인</div>
          ) : null}
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
              alt="id"
            />
          </div>
          {showtxt ? <div>경고 : 숫자만 입력해주세요</div> : null}
          <input
            onChange={(e) => {
              setNum(e.target.value);
            }}
          />
          <div className="col-md-6">
            <h4 className="pt-5">
              {찾는상품.title} {찾는상품.id}
            </h4>
            <p>{찾는상품.content}</p>
            <p>{찾는상품.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                let newItem = {id : 찾는상품.id, name : 찾는상품.title, count : 1 }
                dispatch(addItem(newItem));
              }}
            >
              주문하기
            </button>
          </div>
          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTabSw(0);
                }}
                eventKey="link0"
              >
                버튼0
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTabSw(1);
                }}
                eventKey="link1"
              >
                버튼1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setTabSw(2);
                }}
                eventKey="link2"
              >
                버튼2
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent tabSw={tabSw} shoes={props.shoes} id={찾는상품.id} />
        </div>
      ) : (
        <h4>잘못된 접근입니다.</h4>
      )}
    </div>
  );
}

function TabContent({ tabSw, shoes, id }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [tabSw]);
  return (
    <div className={`start ${fade}`}>
      {
        [
          <div>
            {shoes[`${id}`].title} 재고 : {재고[`${id}`]}
          </div>,
          <div>내용1</div>,
          <div>내용2</div>,
        ][tabSw]
      }
    </div>
  );
  // if( tabSw === 0) {
  // return <div> 내용 0</div>
  // }
  // if( tabSw === 1) {
  // return <div> 내용 1</div>
  // }
  // if( tabSw === 2) {
  // return <div> 내용 2</div>
  // }
}
export default Detail;

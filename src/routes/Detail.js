import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button`
  font-size: 20px;
  color: ${(props) => props.color};
`;

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
  useEffect(() => {
    console.log("안녕");
  });

  let [count, setCount] = useState(0);

  // 현재 url에 입력한 숫자
  let { id } = useParams();
  let 찾는상품 = props.shoes.find((배열자료) => {
    return 배열자료.id === id;
  });

  return (
    <div className="container">
      {찾는상품 ? (
        <div className="row">
          <p>{count}</p>
          <YellowBtn
            color="red"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            버튼
          </YellowBtn>
          <div className="col-md-6">
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="100%"
              alt="id"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{찾는상품.title}</h4>
            <p>{찾는상품.content}</p>
            <p>{찾는상품.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      ) : (
        <h4>잘못된 접근입니다.</h4>
      )}
    </div>
  );
}
export default Detail;

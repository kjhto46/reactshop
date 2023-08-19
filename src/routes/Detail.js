import { useParams } from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button`
  font-size: 20px;
  color: ${(props) => props.color};
`;

function Detail(props) {
  // 현재 url에 입력한 숫자
  let { id } = useParams();
  let 찾는상품 = props.shoes.find((배열자료) => {
    return 배열자료.id === id;
  });

  return (
    <div className="container">
      {찾는상품 ? (
        <div className="row">
          <YellowBtn color="blue">버튼</YellowBtn>
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

import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../store/userSlice";
import { countDown, countUp } from "../store/cartSlice";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  // console.log(state);
  let dispatch = useDispatch();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(countDown(state.cart[i].id));
                  }} >
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(countUp(state.cart[i].id));
                  }} >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        <p>{state.user.name} {state.user.age}의 장바구니</p>
        <button onClick={()=>{dispatch(increase(1))}}>버튼</button>
    </div>
  );
}
export default Cart;

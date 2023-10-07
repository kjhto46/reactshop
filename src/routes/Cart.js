import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increase } from "../store/userSlice";
import { countDown, countUp } from "../store/cartSlice";
// import { memo, useDeferredValue, useMemo, useState, useTransition } from "react";

// let Child = memo(function () {
//   console.log("hi");
//   return <div>자식임</div>;
// });

// // 예시 함수
// function sampleFunction() {
//   return <>반복문 10억번 돌린 내용</>;
// }

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();

  // let [count, setCount] = useState(0);
  /** useMemo와 useEffect 차이
   * useEffect는 렌더링되고 난 후 실행
   * useMemo는 렌더링이 진행되면서 실행
   * 실행 시점의 차이
   */
  // let result = useMemo(() => {
  //   return sampleFunction();
  // }, [state]);

  // let a = Array(10000).fill(0);
  // let [name, setName] = useState("");
  // let [isPending, startTransition] = useTransition();
  // let stateName = useDeferredValue(state) //여기에 넣은 state는 늦게 변동사항이 처리된다.

  return (
    <div>
      {/* <Child></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}+
      </button>
      <input
        onChange={(e) => {
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? "로딩중"
        : a.map(() => {
            return <div>{name}</div>;
          })} */}
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
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(countUp(state.cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        {state.user.name} {state.user.age}의 장바구니
      </p>
      <button
        onClick={() => {
          dispatch(increase(1));
        }}
      >
        버튼
      </button>
    </div>
  );
}
export default Cart;

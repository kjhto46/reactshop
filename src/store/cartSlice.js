import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
   name: "cart",
   initialState: [
     { id: 0, name: "White and Black", count: 2 },
     { id: 2, name: "Grey Yordan", count: 1 },
   ],
   reducers : {
      countUp(state, action) {
         let index = state.findIndex((a)=>{ return a.id === action.payload })
         state[index].count++
      },
      countDown(state, action) {
         let index = state.findIndex((item) => item.id === action.payload)
         if(state[index].count > 1) {
            state[index].count--;
         }
      },
      addItem(state, action) {
         const newItem = action.payload;
         const existingItem = state.find((item) => item.id === newItem.id);
         if (existingItem) {
            existingItem.count += newItem.count
         } else {
            state.push(newItem)
         }
      }
   }
 });

 export let {countUp, countDown, addItem } = cart.actions

 export default cart
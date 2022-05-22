import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./redux/counterReducer";
import {
  add,
  deleteRandom,
  changeNumOfPlayers,
  selectList,
} from "./redux/listReducer";
import "./App.css";

import Page from "./pages/page1";

export default function App() {
  const count = useSelector(selectCount);
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  var [idk, setIdk] = useState(0);

  function changePage(val) {
    setIdk((idk += val));
    console.log(idk);
  }

  switch (idk) {
    case 0:
      return (
        <div>
          <ButtonNavigation fun={changePage}/>
          <Page prev={[]} current={list.banPhase1} banArrayType="BAN_ARRAY_1"/>
        </div>
      );

    case 1:
      return (
        <div>
          <ButtonNavigation fun={changePage}/>
          <Page prev={list.banPhase1} current={list.banPhase1.concat(list.banPhase2)} banArrayType="BAN_ARRAY_2"/>
          {/* <p>pp</p> */}
        </div>
      );

    case 2:
      return (
        <div>
          <ButtonNavigation fun={changePage}/>
          <Page prev={list.banPhase1.concat(list.banPhase2)} current={list.banPhase1.concat(list.banPhase2, list.banPhase3)} banArrayType="BAN_ARRAY_3"/>
          {/* <div>Number of players:</div>
          <select
            value={list.settings.numberOfPlayers}
            onChange={(e) => dispatch(changeNumOfPlayers(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select> */}
        </div>
      );


      //this one use useless...mayb will use later for picks
    case 3:
      return (
        <div>
          <ButtonNavigation fun={changePage}/>
          <Page prev={list.banPhase1.concat(list.banPhase2, list.banPhase3)} current={list.banPhase1.concat(list.banPhase2)} banArrayType="BAN_ARRAY_4"/>
          {/* <p>pp2</p>
          <h1>Count : {count}</h1>
          <button
            onClick={() => {
              dispatch(increment());
            }}
          >
            increment
          </button>
          <button
            onClick={() => {
              dispatch(decrement());
            }}
          >
            decrement
          </button>
          <button onClick={() => dispatch(incrementByAmount(Number(10) || 0))}>
            increment by 10
          </button> */}
        </div>
      );

    default:
      return (
        <div>
          <ButtonNavigation fun={changePage}/>
          <p>pp2</p>
        </div>
      );
  }
}

const ButtonNavigation = ({fun}) => {
  return(
  <div>
    <button onClick={() => fun(-1)}>back</button>
    <button onClick={() => fun(+1)}>next</button>
  </div>
  );
}

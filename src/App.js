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
  //const count = useSelector(selectCount);
  const list = useSelector(selectList);
  const  dispatch = useDispatch();

  var [idk, setIdk] = useState(0);

  function changePage(val) {
    setIdk((idk += val));
    console.log(idk);
  }

  switch (idk) {
    case 0:
      return (
        <div>
          <ButtonNavigation fnc={changePage}/>
          <div>Number of players:</div>
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
          </select>

          <select value={list.settings.normOrDraft} onChange>
          <option value="false">Normal</option>
            <option value="true">Draft</option>
          </select>

          <div>Players:</div>
          {/*create mapper for player names by selected number of players*/}
        </div>
      );
      
    case 1:
      return (
        <div>
          <ButtonNavigation fnc={changePage}/>
          <div>Your team bans:</div>
          <Page prev={[]} current={list.banPhase1} banArrayType="BAN_ARRAY_1"/>
        </div>
      );

    case 2:
      return (
        <div>
          <ButtonNavigation fnc={changePage}/>
          <div>Enemy bans:</div>
          <Page prev={list.banPhase1} current={list.banPhase1.concat(list.banPhase2)} banArrayType="BAN_ARRAY_2"/>
          {/* <p>pp</p> */}
        </div>
      );

    case 3:
      return (
        <div>
          <ButtonNavigation fnc={changePage}/>
          <div>Optional bans:</div>
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
    case 4:
      return (
        <div>
          <ButtonNavigation fnc={changePage}/>
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
          <ButtonNavigation fnc={changePage}/>
          <p>pp2</p>
        </div>
      );
  }
}

const ButtonNavigation = ({fnc}) => {
  return(
  <div>
    <button onClick={() => fnc(-1)}>back</button>
    <button onClick={() => fnc(+1)}>next</button>
  </div>
  );
}

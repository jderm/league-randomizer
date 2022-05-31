import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList, editSettings } from "./listReducer";
import champ from "./champions.json";

export default function Randomize() {
  var [table, setTable] = useState([champions[{}], players[{}], lanes[{}]]);
  //var [randChamp, setrandChamp] = useState({});
  return (
    <div>
      <table>
        <CreateTable numOfCells={list.settings.players.length} />
      </table>
      {/* <CreateTable numofCells={list.settings.players.count}/> */}
      <button onClick={() => RandomizeChamps}>Randomize champions</button>
      <button onClick={() => RandomizeLanes}>Randomize lanes</button>
    </div>
  );
}

function RandomizeChamps() {}

function RandomizeLanes() {}

const CreateTable = ({ numOfCells }) => {

  let table = [];
  let tempTable = [];
  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<th>{list.pickedChamps[a].name}</th>);
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(
      <td>
        <img src={champ[list.pickedChamps[a].id].icon}></img>
      </td>
    );
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<td>{list.settings.players[a].name}</td>);
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<td>{list.settings.availableLanes[a].name}</td>);
  }
  table.push(<tr>{tempTable}</tr>);
  return table;
};

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList, editSettings } from "../redux/listReducer";
import champ from "../champions.json";

export default function Randomize() {
  const list = useSelector(selectList);
  var [table, setTable] = useState(CreateList);

  const dispatch = useDispatch();
  //var [randChamp, setrandChamp] = useState({});

  function CreateList()
  {
    var arr = {champions:[], players:[], lanes:[]};

    list.pickedChamps.forEach((element) => {
      //var ico = champ.filter(el => el.id === element.id);
      arr.champions.push({
        id: element.id,
        name: element.name,
        icon:champ[element.id].icon,
      });
    });
  
    list.settings.players.forEach((element) => {
      arr.players.push({ id: element.id, name: element.name });
    });
  
    list.settings.availableLanes.forEach((element) => {
      arr.lanes.push({ id: element.id, name: element.name });
    });
    return arr;
  }

  console.log(table)
  
  return (
    <div>
      <table>
        <tbody>
        <CreateTable numOfCells={table.players.length} list={table} />
        </tbody>
      </table>
      {/* <CreateTable numofCells={list.settings.players.count}/> */}
      <button onClick={() => RandomizeChamps}>Randomize champions</button>
      <button onClick={() => RandomizeLanes}>Randomize lanes</button>
    </div>
  );
}

function RandomizeChamps() {}

function RandomizeLanes() {}

const CreateTable = ({ numOfCells, list }) => {
  //create new object array
  //assign to usestate variable
  //create new temp array
  //randomize it
  //render

//   var arr = {champions:[], players:[], lanes:[]};

//   list.pickedChamps.forEach((element) => {
//     //var ico = champ.filter(el => el.id === element.id);
//     arr.champions.push({
//       id: element.id,
//       name: element.name,
//       icon:champ[element.id].icon,
//     });
//   });

//   list.settings.players.forEach((element) => {
//     arr.players.push({ id: element.id, name: element.name });
//   });

//   list.settings.availableLanes.forEach((element) => {
//     arr.lanes.push({ id: element.id, name: element.name });
//   });

//  // setTable(arr);
//   console.log(arr);

  let table = [];
  let tempTable = [];
  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<th>{list.champions[a].name}</th>);
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(
      <td>
        <img src={list.champions[a].icon}></img>
      </td>
    );
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<td>{list.players[a].name}</td>);
  }
  table.push(<tr>{tempTable}</tr>);
  tempTable = [];

  for (var a = 0; a < numOfCells; a++) {
    tempTable.push(<td>{list.lanes[a].name}</td>);
  }
  table.push(<tr>{tempTable}</tr>);


  return table;
};

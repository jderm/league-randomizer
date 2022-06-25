import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectList } from "../redux/listReducer";
import champ from "../champions.json";
import {
  TextField,
  Button,
  Checkbox,
  Input,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

export default function Randomize() {
  const list = useSelector(selectList);
  var [champions, setChampions] = useState(CreateChampionsList);
  var [players] = useState(CreatePlayersList);
  //var players = CreatePlayersList;
  var [lanes, setLanes] = useState(CreateLanesList);
  //const dispatch = useDispatch();

  function CreateChampionsList() {
    var arr = [];

    list.pickedChamps.forEach((element) => {
      arr.push({
        id: element.id,
        name: element.name,
        icon: champ[element.id].icon,
      });
    });
    return arr;
  }

  function CreatePlayersList() {
    var arr = [];

    list.settings.players.forEach((element) => {
      arr.push({ id: element.id, name: element.name });
    });
    return arr;
  }

  function CreateLanesList() {
    var arr = [];
    list.settings.availableLanes.forEach((element) => {
      arr.push({ id: element.id, name: element.name });
    });
    return arr;
  }

  function RandomizeChamps() {
    var tempArr = champions;
    var tempArr2 = [];
    var arrLength = tempArr.length;
    for (var i = 0; i < arrLength; i++) {
      var tempArrLength = tempArr.length;
      var rand = Math.floor(Math.random() * tempArrLength);
      tempArr2.push(tempArr[rand]);
      tempArr.splice(rand, 1);
    }

    tempArr = tempArr2;
    setChampions(tempArr);
  }

  function RandomizeLanes() {
    var tempArr = lanes;
    var tempArr2 = [];
    var arrLength = tempArr.length;
    for (var i = 0; i < arrLength; i++) {
      var tempArrLength = tempArr.length;
      var rand = Math.floor(Math.random() * tempArrLength);
      tempArr2.push(tempArr[rand]);
      tempArr.splice(rand, 1);
    }

    tempArr = tempArr2;
    setLanes(tempArr);
  }
  return (
    <div className="CenterContent">
      {/* <table>
        <tbody>
          <CreateTable
            numOfCells={champions.length}
            champions={champions}
            players={players}
            lanes={lanes}
          />
        </tbody>
      </table> */}
      <div style={{"display": "flex", "justify-content": "center", "flex-flow": "row wrap"}}>
      <CreateTable
            numOfCells={champions.length}
            champions={champions}
            players={players}
            lanes={lanes}
          />
      </div>

      {/* <button onClick={() => RandomizeChamps()}>Randomize champions</button>
      <button onClick={() => RandomizeLanes()}>Randomize lanes</button> */}
      <Button variant="contained" style={{"background-color": "#72737369", "color": "#000", "margin": "30px"}} size="large" onClick={() => RandomizeChamps()}>Randomize champions</Button>
      <Button variant="contained" style={{"background-color": "#72737369", "color": "#000", "margin": "30px"}} size="large" onClick={() => RandomizeLanes()}>Randomize lanes</Button>
      
    </div>
  );
}

const CreateTable = ({ numOfCells, champions, players, lanes }) => {
  let table = [];
  let tempTable = [];
  for(var a = 0; a < numOfCells; a++)
  {
    table.push(
      <div className="randItem" style={{"margin": "20px"}}>
        <h4>{champions[a].name}</h4>
        <img src={champions[a].icon}></img>
        <h5>{players[a].name}</h5>
        <h5>{lanes[a].name}</h5>
      </div>
    )
  }
  // for (var a = 0; a < numOfCells; a++) {
  //   tempTable.push(<th>{champions[a].name}</th>);
  // }
  // table.push(<tr>{tempTable}</tr>);
  // tempTable = [];

  // for (var a = 0; a < numOfCells; a++) {
  //   tempTable.push(
  //     <td>
  //       <img src={champions[a].icon}></img>
  //     </td>
  //   );
  // }
  // table.push(<tr>{tempTable}</tr>);
  // tempTable = [];

  // for (var a = 0; a < numOfCells; a++) {
  //   tempTable.push(<td>{players[a].name}</td>);
  // }
  // table.push(<tr>{tempTable}</tr>);
  // tempTable = [];

  // for (var a = 0; a < numOfCells; a++) {
  //   tempTable.push(<td>{lanes[a].name}</td>);
  // }
  // table.push(<tr>{tempTable}</tr>);
  return table;
};

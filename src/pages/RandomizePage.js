import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectList } from "../redux/listReducer";
// import champ from "../champions.json";
import { Button } from "@mui/material";

export default function Randomize(props) {
  const list = useSelector(selectList);
  var [champions, setChampions] = useState(CreateChampionsList);
  var [players] = useState(CreatePlayersList);
  var [lanes, setLanes] = useState(CreateLanesList);

  //CREATE LIST OF CHAMPIONS
  function CreateChampionsList() {
    var arr = [];
    var allyTeamPicks;
    if (!list.settings.gameType) {
      allyTeamPicks = list.normal.normPicks;
    } else {
      allyTeamPicks = list.draft.draftPicks.filter((e) => e.team === 0);
    }
    allyTeamPicks.forEach((element) => {
      arr.push({
        id: element.id,
        name: element.name,
        icon: props.champ[element.id].icon,
      });
    });
    return arr;
  }

  //CREATE LIST OF PLAYERS
  function CreatePlayersList() {
    var arr = [];
    list.settings.players.forEach((element) => {
      arr.push({ id: element.id, name: element.name });
    });
    return arr;
  }

  //CREATE LIST OF LANES
  function CreateLanesList() {
    var arr = [];
    list.settings.availableLanes.forEach((element) => {
      arr.push({ id: element.id, name: element.name });
    });
    return arr;
  }

  //RANDOMIZE CHAMPIONS
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

  //RANDOMIZE LANES
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexFlow: "row wrap",
        }}
      >
        <CreateTable
          numOfCells={champions.length}
          champions={champions}
          players={players}
          lanes={lanes}
        />
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#72737369", color: "#000", margin: "30px" }}
        size="large"
        onClick={() => RandomizeChamps()}
      >
        Randomize champions
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: "#72737369", color: "#000", margin: "30px" }}
        size="large"
        onClick={() => RandomizeLanes()}
      >
        Randomize lanes
      </Button>
    </div>
  );
}

//CREATE RANDOMIZED TABLE
const CreateTable = ({ numOfCells, champions, players, lanes }) => {
  let table = [];
  for (var a = 0; a < numOfCells; a++) {
    table.push(
      <div
        className="randItem"
        style={{ margin: "20px" }}
        key={champions[a].id}
      >
        <h4>{champions[a].name}</h4>
        <img src={champions[a].icon}></img>
        <h5>{players[a].name}</h5>
        <h5>{lanes[a].name}</h5>
      </div>
    );
  }
  return table;
};

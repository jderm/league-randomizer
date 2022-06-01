import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList, editSettings } from "./redux/listReducer";
import "./App.css";

import Page from "./pages/ChampListPage";
import Settings from "./pages/SettingsPage";
import Randomize from "./pages/RandomizePage";

import champ from "./champions.json";

export default function App() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  var [idk, setIdk] = useState(0);

  var [randLane, setRandLane] = useState({});
  var [randChamp, setrandChamp] = useState({});

  function changePage(val) {
    setIdk((idk += val));
    //console.log(idk);
  }

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

  function RandomizeChamps() {}

  function RandomizeLanes() {}

  switch (idk) {
    case 0:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <Settings/>
          {/* <h3>Normal or draft:</h3>
          <select value={list.settings.normOrDraft} onChange>
            <option value="false">Normal</option>
            <option value="true">Draft</option>
          </select>

          <h3>Number of players:</h3>
          <select
            value={list.settings.players.length}
            onChange={(e) =>
              dispatch(
                editSettings({
                  count: e.target.value,
                  type: "CHANGE_NUMBER_OF_PLAYERS",
                })
              )
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <h3>Players:</h3>
          {list.settings.players.map((item) => (
            <div>
              <h5>Player: {item.id + 1}</h5>
              <input
                type="text"
                id={"playerName" + item.id}
                name={"playerName" + item.id}
                value={item.name}
                onChange={(event) =>
                  dispatch(
                    editSettings({
                      id: item.id,
                      name: event.target.value,
                      type: "CHANGE_PLAYER_NAME",
                    })
                  )
                }
              />
            </div>
          ))}

          <h3>Number of lanes:</h3>
          <select
            value={list.settings.availableLanes.length}
            onChange={(e) =>
              dispatch(
                editSettings({
                  count: e.target.value,
                  type: "CHANGE_NUMBER_OF_LANES",
                })
              )
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <h3>Lanes:</h3>
          {list.settings.availableLanes.map((item) => (
            <div>
              <h5>Lane: {item.id + 1}</h5>
              <input
                type="text"
                id={"lane" + item.id}
                name={"lane" + item.id}
                value={item.name}
                onChange={(event) =>
                  dispatch(
                    editSettings({
                      id: item.id,
                      name: event.target.value,
                      type: "CHANGE_LANE_NAME",
                    })
                  )
                }
              />
            </div>
          ))} */}
        </div>
      );

    case 1:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <h3>Your team bans:</h3>
          <Page
            prev={[]}
            current={list.banPhase1}
            //combined={list.banPhase1}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_1"
          />
        </div>
      );

    case 2:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <h3>Enemy bans:</h3>
          <Page
            prev={list.banPhase1}
            current={list.banPhase2}
            //combined={list.banPhase1.concat(list.banPhase2)}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_2"
          />
        </div>
      );

    case 3:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <h3>Optional bans:</h3>
          <Page
            prev={list.banPhase1.concat(list.banPhase2)}
            current={list.banPhase3}
            //combined={list.banPhase1.concat(list.banPhase2, list.banPhase3)}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_3"
          />
        </div>
      );

    case 4:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <h3>Player picks:</h3>
          <Page
            prev={list.banPhase1.concat(list.banPhase2, list.banPhase3)}
            current={list.pickedChamps}
            //combined={list.banPhase1.concat(list.banPhase2, list.banPhase3, list.pickedChamps)}
            numberOfBans={list.settings.players.length}
            banArrayType="BAN_ARRAY_4"
          />
        </div>
      );

    case 5:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <table>
            {/* <CreateTable numOfCells={list.settings.players.length} /> */}
            <Randomize/>
          </table>
          {/* <CreateTable numofCells={list.settings.players.count}/> */}
          {/* <button onClick={() => RandomizeChamps}>Randomize champions</button>
          <button onClick={() => RandomizeLanes}>Randomize lanes</button> */}
        </div>
      );

    default:
      return (
        <div>
          <ButtonNavigation fnc={changePage} idk={idk} />
          <h3>Default page</h3>
        </div>
      );
  }
}

const ButtonNavigation = ({ fnc, idk }) => {
  if(idk === 0)
  {
    return (
      <div>
        <button onClick={() => fnc(+1)}>next</button>
      </div>
    );
  }

  else if(idk === 5)
  {
    return (
      <div>
        <button onClick={() => fnc(-1)}>back</button>
      </div>
    );
  }

  else if(idk > 0)
  {
    return (
      <div>
        <button onClick={() => fnc(+1)}>next</button>
        <button onClick={() => fnc(-1)}>back</button>
      </div>
    );
  }

};

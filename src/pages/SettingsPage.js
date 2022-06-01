import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList, editSettings } from "../redux/listReducer";

export default function Settings() {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Normal or draft:</h3>
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
      {/*create mapper for player names by selected number of players*/}
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
      ))}
    </div>
  );
}

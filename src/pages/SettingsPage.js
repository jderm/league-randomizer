import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectList, editSettings } from "../redux/listReducer";
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

export default function Settings({ changePagesOrder }) {
  const list = useSelector(selectList);
  const dispatch = useDispatch();

  return (
    <div className="CenterContent">
      <h1>League of Legends Randomizer</h1>
      <div className="SettingsContainer">
        <h3>Normal or draft:</h3>
        <Select
          value={list.settings.gameType}
          variant="filled"
          style={{ width: "100%" }}
          onChange={(e) => {
            dispatch(
              editSettings({ type: "CHANGE_GAME_TYPE", value: e.target.value })
            );
            changePagesOrder(0, e.target.value);
          }}
        >
          <MenuItem value="false">Normal</MenuItem>
          <MenuItem value="true">Draft</MenuItem>
        </Select>
      </div>
      <div className="SettingsContainer">
        <FormControlLabel
          label="Optional bans"
          control={
            <Checkbox
              id="optionalBans"
              name="optionalBans"
              value={list.settings.optBans}
              checked={list.settings.optBans}
              onChange={(e) => {
                dispatch(editSettings({ type: "OPTIONAL_BANS" }));
                changePagesOrder(1, e.target.value);
              }}
              disabled={list.settings.gameType}
            />
          }
        />
      </div>
      <div className="SettingsContainer">
        <h3>Number of players:</h3>
        <Select
          value={list.settings.players.length}
          variant="filled"
          style={{ width: "100%" }}
          onChange={(e) =>
            dispatch(
              editSettings({
                count: e.target.value,
                type: "CHANGE_NUMBER_OF_PLAYERS",
              })
            )
          }
          disabled={list.settings.gameType}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </div>

      <div className="SettingsContainer">
        <h3>Players:</h3>
        {list.settings.players.map((item) => (
          <div
            style={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
            key={item.id}
          >
            <TextField
              id={"playerName" + item.id}
              variant="filled"
              name={"playerName" + item.id}
              value={item.name}
              fullWidth
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
      </div>

      <div className="SettingsContainer">
        <h3>Number of lanes:</h3>
        <Select
          value={list.settings.availableLanes.length}
          variant="filled"
          style={{ width: "100%" }}
          onChange={(e) =>
            dispatch(
              editSettings({
                count: e.target.value,
                type: "CHANGE_NUMBER_OF_LANES",
              })
            )
          }
          disabled={list.settings.gameType}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </div>

      <div className="SettingsContainer">
        <h3>Lanes:</h3>
        {list.settings.availableLanes.map((item) => (
          <div
            style={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
            key={item.id}
          >
            <TextField
              id={"lane" + item.id}
              variant="filled"
              name={"lane" + item.id}
              value={item.name}
              fullWidth
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
    </div>
  );
}

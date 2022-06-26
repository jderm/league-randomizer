import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ban } from "../redux/listReducer";
import champ from "../champions.json";
import { AutoSizer, List } from "react-virtualized";
import "../Style.css";
import "../App.css";

import { TextField } from "@mui/material";

export default function Page({
  prev,
  current,
  banArrayType,
  numberOfBans,
  title,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  var banFilteredChampArr = champ.filter((val) =>
    prev.every((e) => e.id !== val.id)
  );

  const ITEM_SIZE = 150;

  //CHAMP LIST FILTERED OF SEARCHBAR
  var searchFilteredChampArr = banFilteredChampArr.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  return (
    <div>
      <div className="CenterContent">
        <h3>{title}</h3>
        <TextField
          id="filter"
          variant="filled"
          name="filter"
          value={searchTerm}
          fullWidth
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <h4>Selected champions:</h4>
        <ol>
          {current.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ol>
        <h4>Picks/bans remaining: ({numberOfBans - current.length})</h4>
      </div>
      <div
        id="ChampionSelector"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: "100%",
            height: "calc(100vh - (289px + 43px + 25px + 38px))",
            maxWidth: "1500px",
          }}
        >
          <AutoSizer>
            {({ width, height }) => {
              const itemsPerRow = Math.floor(width / ITEM_SIZE);
              var rowCount = Math.ceil(
                searchFilteredChampArr.length / itemsPerRow
              );
              return (
                <List
                  className="List"
                  width={width}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={ITEM_SIZE}
                  rowRenderer={({ index, key, style, parent }) => {
                    const items = [];
                    const fromIndex = index * itemsPerRow;
                    const toIndex = Math.min(
                      fromIndex + itemsPerRow,
                      searchFilteredChampArr.length
                    );
                    for (let i = fromIndex; i < toIndex; i++) {
                      items.push(
                        //RENDERING ITEM
                        <div
                          className="Item"
                          key={searchFilteredChampArr[i].id}
                        >
                          <h4>{searchFilteredChampArr[i].name}</h4>
                          <input
                            type="checkbox"
                            id={i}
                            labelid={"Item" + searchFilteredChampArr[i].id}
                            checked={current.some(
                              (e) => e.id === searchFilteredChampArr[i].id
                            )}
                            onChange={() =>
                              dispatch(
                                ban({
                                  id: searchFilteredChampArr[i].id,
                                  name: searchFilteredChampArr[i].name,
                                  type: banArrayType,
                                })
                              )
                            }
                          />
                          <label
                            htmlFor={"Item" + searchFilteredChampArr[i].id}
                            className="labelClass"
                            onClick={() =>
                              dispatch(
                                ban({
                                  id: searchFilteredChampArr[i].id,
                                  name: searchFilteredChampArr[i].name,
                                  type: banArrayType,
                                })
                              )
                            }
                          >
                            <img
                              src={searchFilteredChampArr[i].icon}
                              alt={searchFilteredChampArr[i].name}
                            />
                          </label>
                        </div>
                      );
                    }
                    //RENDER WHOLE ROW
                    return (
                      <div className="Row" key={key} style={style}>
                        {items}
                      </div>
                    );
                  }}
                />
              );
            }}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}

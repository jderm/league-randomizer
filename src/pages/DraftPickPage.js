import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { draftPick, firstPick, selectList } from "../redux/listReducer";
// import champ from "../champions.json";
import { AutoSizer, List } from "react-virtualized";
import "../Style.css";
import "../App.css";
import { TextField, Radio, Button } from "@mui/material";

var playersWithoutPick = [];

var currTeamPattern = [];

const allyTeamPattern = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
const enemyTeamPattern = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0];

export default function Page({champ}) {
  const list = useSelector(selectList);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  var [draftPage, setDraftPage] = useState(setPageFnc(list.draft.draftPicks));
  //CHAMP LIST FILTERED OF BANS
  var prev = list.draft.allyBans.concat(list.draft.enemyBans);
  var banFilteredChampArr = champ.filter((val) =>
    prev.every((e) => e.id !== val.id)
  );

  var pickFiltereredChampArr = filterOfPicks(list.draft.draftPicks);

  //CHAMP LIST FILTERED OF SEARCHBAR
  var searchFilteredChampArr = pickFiltereredChampArr.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  //SET DEFAULT PAGE ON LOAD
  function setPageFnc(arrayOfPicks) {
    var defPlayerWithoutPick = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (arrayOfPicks.length === 10) {
      return 10;
    } else if (arrayOfPicks.length !== 0) {
      var tempPlayersWithPicks = [];

      arrayOfPicks.forEach((element) => {
        tempPlayersWithPicks.push(element.pickPos);
      });

      playersWithoutPick = defPlayerWithoutPick.filter((val) =>
        tempPlayersWithPicks.every((e) => e !== val)
      );
      return playersWithoutPick[0];
    } else {
      playersWithoutPick = defPlayerWithoutPick;
      return 0;
    }
  }

  //FILTER CHAMPIONS OF PICKED CHAMPS
  function filterOfPicks(arrayOfPicks) {
    var temp = [];
    if (arrayOfPicks.length >= draftPage) {
      for (var a = 0; a < draftPage - 1; a++) {
        temp.push(arrayOfPicks[a]);
      }
      var filtered = banFilteredChampArr.filter((val) =>
        temp.every((e) => e.id !== val.id)
      );
    } else {
      for (var a = 0; a < arrayOfPicks.length; a++) {
        temp.push(arrayOfPicks[a]);
      }
      var filtered = banFilteredChampArr.filter((val) =>
        temp.every((e) => e.id !== val.id)
      );
    }
    return filtered;
  }

  //CHANGE PAGE
  function changePage(val) {
    var e = draftPage + val;
    setDraftPage(e);
  }

  //CHANGE PICK PATTERN
  function changePattern(val) {
    if (val === "0") {
      currTeamPattern = allyTeamPattern;
      playersWithoutPick = [];
    } else if (val === "1") {
      currTeamPattern = enemyTeamPattern;
      playersWithoutPick = [];
    }
  }

  //NAVIGATION BUTTONS
  const NavButtons = () => {
    if (draftPage === 0) {
      if (list.draft.firstPickTeam !== null) {
        return (
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#72737369", color: "#000" }}
              size="small"
              onClick={() => changePage(1)}
            >
              next
            </Button>
          </div>
        );
      }
    } else if (draftPage === 10) {
      return (
        <div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#72737369", color: "#000" }}
            size="small"
            onClick={() => changePage(-1)}
          >
            back
          </Button>
        </div>
      );
    } else if (draftPage > 0 && draftPage < 10) {
      if (playersWithoutPick.includes(draftPage)) {
        return (
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#72737369", color: "#000" }}
              size="small"
              onClick={() => changePage(-1)}
            >
              back
            </Button>
          </div>
        );
      } else {
        return (
          <div>
            <Button
              variant="contained"
              style={{ backgroundColor: "#72737369", color: "#000" }}
              size="small"
              onClick={() => changePage(-1)}
            >
              back
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#72737369", color: "#000" }}
              size="small"
              onClick={() => changePage(1)}
            >
              next
            </Button>
          </div>
        );
      }
    }
  };

  if (draftPage === 0) {
    return (
      <div>
        <div className="NavigationButtons">
        <NavButtons />
        </div>
        <div className="NavigationButtons">
        <RadioButton
          val={"0"}
          firstTeamPick={list.draft.firstPickTeam}
          dispatch={dispatch}
          firstPick={firstPick}
          changePattern={changePattern}
        />
        </div>
        <div className="NavigationButtons">
        <RadioButton
          val={"1"}
          firstTeamPick={list.draft.firstPickTeam}
          dispatch={dispatch}
          firstPick={firstPick}
          changePattern={changePattern}
        />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="NavigationButtons">
        <NavButtons />
        </div>
        <AllyEnemyPick
          currTeamPattern={currTeamPattern}
          draftPage={draftPage}
        />
        
        <ChampSearchComponent
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
        <ChampPickComponent
          searchFilteredChampArr={searchFilteredChampArr}
          dispatch={dispatch}
          draftPick={draftPick}
          draftPage={draftPage}
          arrayOfPicks={list.draft.draftPicks}
        />
      </div>
    );
  }
}

//RADIO BUTTON COMPONENT
const RadioButton = ({
  val,
  firstTeamPick,
  dispatch,
  firstPick,
  changePattern,
}) => {
  var id = "rftp" + val;
  var text = "";
  var checked = null;

  if (val === "0") {
    text = "Ally team";
  } else if (val === "1") {
    text = "Enemy team";
  }

  if (firstTeamPick === val) {
    checked = true;
  } else {
    checked = false;
  }
  return (
    <>
      <Radio
        checked={checked}
        onChange={(e) => {
          dispatch(firstPick(e.target.value));
          changePattern(val);
        }}
        value={val}
        name="test"
        id={id}
        inputProps={{ "aria-label": { val } }}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
};

//ALLY OR ENEMY PICK TEXT
const AllyEnemyPick = ({ currTeamPattern, draftPage }) => {
  if (currTeamPattern[draftPage - 1] === 0) {
    return <h3>Ally pick</h3>;
  } else {
    return <h3>Enemy pick</h3>;
  }
};

//CHAMPION PICK COMPONENT
const ChampPickComponent = ({
  searchFilteredChampArr,
  dispatch,
  draftPick,
  draftPage,
  arrayOfPicks,
}) => {
  const ITEM_SIZE = 150;
  return (
    <div>
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
                  rowRenderer={({ index, key, style }) => {
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
                            checked={arrayOfPicks.some(
                              (e) =>
                                e.id === searchFilteredChampArr[i].id &&
                                e.pickPos === draftPage
                            )}
                            onChange={() =>
                              dispatch(
                                draftPick({
                                  pickPos: draftPage,
                                  team: currTeamPattern[draftPage - 1],
                                  id: searchFilteredChampArr[i].id,
                                  name: searchFilteredChampArr[i].name,
                                })
                              )
                            }
                          />
                          <label
                            htmlFor={"Item" + searchFilteredChampArr[i].id}
                            className="labelClass"
                            onClick={() =>
                              dispatch(
                                draftPick({
                                  pickPos: draftPage,
                                  team: currTeamPattern[draftPage - 1],
                                  id: searchFilteredChampArr[i].id,
                                  name: searchFilteredChampArr[i].name,
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
};

//CHAMPION SEARCH COMPONENT
const ChampSearchComponent = ({ setSearchTerm, searchTerm }) => {
  return (
    <div className="CenterContent">
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
    </div>
  );
};

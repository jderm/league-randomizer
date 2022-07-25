import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ban, draftPick, firstPick } from "../redux/listReducer";
import champ from "../champions.json";
import { AutoSizer, List } from "react-virtualized";
import "../Style.css";
import "../App.css";
import { TextField } from "@mui/material";

var playersWithoutPick = [];

var currTeamPattern = [];

const allyTeamPattern = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
const enemyTeamPattern = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0];

export default function Page({
  prev,
  current,
  banArrayType,
  numberOfBans,
  title,
  arrayOfPicks,
  firstTeamPick,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  var [draftPage, setDraftPage] = useState(setPageFnc(arrayOfPicks));

  //LOOKS OK
  //CHAMP LIST FILTERED OF BANS
  var banFilteredChampArr = champ.filter((val) =>
    prev.every((e) => e.id !== val.id)
  );

  //LOOKS OK
  var pickFiltereredChampArr = filterOfPicks();

  //LOOKS OK
  //CHAMP LIST FILTERED OF SEARCHBAR
  var searchFilteredChampArr = pickFiltereredChampArr.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  //LOOKS OK
  //arrayOfPicks, playersWithoutPick
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
      console.log("Players without pick: " + playersWithoutPick);
      return playersWithoutPick[0];
    } else {
      playersWithoutPick = defPlayerWithoutPick;
      return 0;
    }
  }

  //LOOKS OK
  //arrayOfPicks, draftPage, banFilteredChampArr,
  function filterOfPicks() {
    var temp = [];
    if (arrayOfPicks.length >= draftPage) {
      for (var a = 0; a < draftPage - 1; a++) {
        temp.push(arrayOfPicks[a]);
      }
      var filtered = banFilteredChampArr.filter((val) =>
        temp.every((e) => e.id !== val.id)
      );
      //return filtered;
    } else {
      //var temp = [];
      for (var a = 0; a < arrayOfPicks.length; a++) {
        temp.push(arrayOfPicks[a]);
      }
      var filtered = banFilteredChampArr.filter((val) =>
        temp.every((e) => e.id !== val.id)
      );
    }
    return filtered;
  }

  //LOOKS OK
  //val, draftPage, setDraftPage
  function changePage(val) {
    var e = draftPage + val;
    setDraftPage(e);
  }

  //LOOKS OK
  //val, currTeamPattern, allyTeamPattern, enemyTeamPattern
  function changePattern(val) {
    if (val === "0") {
      currTeamPattern = allyTeamPattern;
      //setCurrTeamPattern(allyTeamPattern);
    } else if (val === "1") {
      currTeamPattern = enemyTeamPattern;
      //setCurrTeamPattern(enemyTeamPattern);
    }
    // console.log(currTeamPattern);
  }

  //LOOKS OK
  //draftPage, currTeamPattern, firstTeamPick, changePage, playersWithoutPick
  const NavButtons = () => {
    // console.log(draftPage);
    // console.log(currTeamPattern);
    // console.log(playersWithoutPick);
    if (draftPage === 0) {
      if (firstTeamPick !== null) {
        return (
          <div>
            <button onClick={() => changePage(1)}>next</button>
          </div>
        );
      }
    } else if (draftPage === 10) {
      return (
        <div>
          <button onClick={() => changePage(-1)}>back</button>
        </div>
      );
    } else if (draftPage > 0 && draftPage < 10) {
      if (playersWithoutPick.includes(draftPage)) {
        return (
          <div>
            <button onClick={() => changePage(-1)}>back</button>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={() => changePage(-1)}>back</button>
            <button onClick={() => changePage(1)}>next</button>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <NavButtons />
      <DraftPageController
        draftPage={draftPage}
        setSearchTerm={setSearchTerm}
        searchFilteredChampArr={searchFilteredChampArr}
        dispatch={dispatch}
        draftPick={draftPick}
        arrayOfPicks={arrayOfPicks}
        firstTeamPick={firstTeamPick}
        firstPick={firstPick}
        changePattern={changePattern}
        searchTerm={searchTerm}
      />
    </div>
  );
}

//LOOKS OK
//val, firstTeamPick, dispatch, firstPick, changePattern
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
      <label htmlFor={id}>{text}</label>
      <input
        type="radio"
        name="test"
        value={val}
        id={id}
        onChange={(e) => {
          dispatch(firstPick(e.target.value));
          changePattern(e.target.value);
        }}
        checked={checked}
      />
    </>
  );
};

//LOOKS OK
//currTeamPattern, draftPage
const AllyEnemyPick = ({ currTeamPattern, draftPage }) => {
  if (currTeamPattern[draftPage - 1] === 0) {
    return <div>Ally pick</div>;
  } else {
    return <div>Enemy pick</div>;
  }
};

//LOOKS OK
//ITEM_SIZE, searchFilteredChampArr, dispatch, draftPick, draftPage, currTeamPattern, arrayOfPicks
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
      {/* <AllyEnemyPick /> */}
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
                                  pickPos: draftPage--,
                                  team: currTeamPattern[draftPage--],
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
                                  pickPos: draftPage--,
                                  team: currTeamPattern[draftPage--],
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
  // }
};

//LOOKS OK
//setSearchTerm
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

//LOOKS OK
//draftPage
const DraftPageController = ({
  draftPage,
  setSearchTerm,
  searchFilteredChampArr,
  dispatch,
  draftPick,
  arrayOfPicks,
  firstTeamPick,
  firstPick,
  changePattern,
  searchTerm,
}) => {
  if (draftPage === 0) {
    return (
      <div>
        <RadioButton
          val={"0"}
          firstTeamPick={firstTeamPick}
          dispatch={dispatch}
          firstPick={firstPick}
          changePattern={changePattern}
        />
        <RadioButton
          val={"1"}
          firstTeamPick={firstTeamPick}
          dispatch={dispatch}
          firstPick={firstPick}
          changePattern={changePattern}
        />
      </div>
    );
  } else {
    return (
      <div>
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
          arrayOfPicks={arrayOfPicks}
        />
      </div>
    );
  }
};

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ban, draftPick, firstPick } from "../redux/listReducer";
import champ from "../champions.json";
import { AutoSizer, List } from "react-virtualized";
import "../Style.css";
import "../App.css";
import { TextField } from "@mui/material";

//ARRAY WITH PICKED OR BANNED CHAMPS AND HIGHLIGHT ONLY CHAMP DEPENDING ON PAGE POSITION (AT START COPY FROM REDUX STORE INTO THIS ARRAY AND EDIT IT ON RUN)
//var champsArr = [banOrPickchampsArray];
//IN CASE OF CHANGING OR DELETING CHAMP FROM ARRAY MID PICK OR BAN AND INSERTING NEW AT SPEC POSITION
//champsArr.splice(index, 0, champItem);

//PICKBAN PATTERN [0,1,1,0,0,1,1,0,0,1] & [1,0,0,1,1,0,0,1,1,0]
//ON FIRST TEAM PICK CHANGE AFTER HAVING ALREADY PICKED CHAMPS --> CLEAR PICKED CHAMPS AND START OVER AGAIN

//EXAMPLE OF ARRAY OF PICKED CHAMPS
//
// [
//   {
//     id:0,
//     pickPos:1,
//     team:0,
//     name:"Aatrox",
//     icon:"aatroxIcon",
//   },
//   {
//     id:1,
//     pickPos:2,
//     team:1,
//     name:"Ahri",
//     icon:"ahriIcon",
//   },
//   {
//     id:3,
//     pickPos:4,
//     team:0,
//     name:"Amumu",
//     icon:"amumuIcon",
//   },
// ]

var playersWithoutPick = [];

function idk(arrayOfPicks) {
  if (arrayOfPicks.length !== 0) {
    //var playersWithoutPick = [];
    for (var a = 1; a <= 10; a++) {
      if (arrayOfPicks[a].pickPos !== a) {
        playersWithoutPick.push(a);
      }
    }
    //THEN AFTER LOAD OF SCRIPT WITH A FEW BANNED CHAMPS JUMP ON PAGE WHERE PLAYER HAVENT PICKED YET (OFCOURSE DONT ALLOW TO CONTINUE TILL PLAYER PICK)
    console.log("Players without pick: " + playersWithoutPick);
    return playersWithoutPick[0];
  } else {
    return 0;
  }
}

//RETHINK AND REDESIGN RENDER PATTERN
//MAIN COMPONENT
// IF(arrayOfPicks !== 0) => calc array of playersWithoutPick => change draftPage to first playerPage without pick
// IF render buttons under different conditions by need
// IF draftPick isnt null render radio buttons
// THEN render champ pick component

//MAYBE ADD COMPONENT WITH NUMBER OF CURRENT PICK

var currTeamPattern = [];

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

  //DONT FORGET ABOUT THIS
  //SET THAT VARIABLE BY NUMBER OF BANNED OR PICKED CHAMPS FROM REDUX (ALWAYS START FROM END IN CASE OF RETURNING BACK)
  //

  const allyTeamPattern = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1];
  const enemyTeamPattern = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0];
  //var [currTeamPattern, setCurrTeamPattern] = useState([]);
  var [draftPage, setDraftPage] = useState(idk([]));
  const ITEM_SIZE = 150;

  //CHAMP LIST FILTERED OF BANS
  var banFilteredChampArr = champ.filter((val) =>
    prev.every((e) => e.id !== val.id)
  );

  //CHAMP LIST FILTERED OF SEARCHBAR
  var searchFilteredChampArr = banFilteredChampArr.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  function changePage(val) {
    var e = draftPage + val;
    setDraftPage(e);
  }

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

  const NavButtons = () => {
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

  const RadioButton = (val) => {
    var id = "rftp" + val.val;
    var text = "";
    var checked = null;
    if (val.val === "0") {
      text = "Ally team";
    } else if (val.val === "1") {
      text = "Enemy team";
    }

    if (firstTeamPick === val.val) {
      checked = true;
      // return (
      //   <>
      //     <label htmlFor={id}>{text}</label>
      //     <input
      //       type="radio"
      //       name="test"
      //       value={val.val}
      //       id={id}
      //       onChange={(e) => {
      //         dispatch(firstPick(e.target.value));
      //         changePattern(e.target.value);
      //       }}
      //       checked={true}
      //     />
      //   </>
      // );
    } else {
      checked = false;
      // return (
      //   <>
      //     <label htmlFor={id}>{text}</label>
      //     <input
      //       type="radio"
      //       name="test"
      //       value={val.val}
      //       id={id}
      //       onChange={(e) => {
      //         dispatch(firstPick(e.target.value));
      //         changePattern(e.target.value);
      //       }}
      //       checked={false}
      //     />
      //   </>
      // );
    }
    return (
      <>
        <label htmlFor={id}>{text}</label>
        <input
          type="radio"
          name="test"
          value={val.val}
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

  const AllyEnemyPick = () => {
    if (currTeamPattern[draftPage - 1] === 0) {
      return <div>Ally pick</div>;
    } else {
      return <div>Enemy pick</div>;
    }
  };

  const ChampPickComponent = () => {
      if(draftPicks.length === 0)
    {
      setDraftPage(0);
    }
    else
    {
      if(draftPicks.length === 10)
      {
        setDraftPage(10);
      }
      else
      {
        setDraftPage(playersWithoutPick[0].page);
      }
    }
    //CONTROLLING PAGES
    // if (draftPage === 0) {
    //   //RENDERING FIRST PICK PAGE
    //   // return (
    //   //   <div>
    //   //     <RadioButton val={"0"} />
    //   //     <RadioButton val={"1"} />
    //   //   </div>
    //   // );
    // } else {
    //   // console.log(currTeamPattern);
    //   //RENDERING PICKING PAGE
      return (
        <div>
          <AllyEnemyPick />
          <div className="CenterContent">
            {/* <h3>{title}</h3> */}
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
            {/* <h4>Selected champions:</h4>
          <ol>
            {current.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ol>
          <h4>Picks/bans remaining: ({numberOfBans - current.length})</h4> */}
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
                                // checked={current.some(
                                //   (e) => e.id === searchFilteredChampArr[i].id
                                // )}
                                onChange={() =>
                                  dispatch(
                                    draftPick({
                                      pickPos: draftPage--,
                                      team: currTeamPattern[draftPage--],
                                      id: searchFilteredChampArr[i].id,
                                      name: searchFilteredChampArr[i].name,
                                    })
                                    // ban({
                                    //   id: searchFilteredChampArr[i].id,
                                    //   name: searchFilteredChampArr[i].name,
                                    //   type: banArrayType,
                                    // })
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
                                    // ban({
                                    //   id: searchFilteredChampArr[i].id,
                                    //   name: searchFilteredChampArr[i].name,
                                    //   type: banArrayType,
                                    // })
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
  


  //PROBLEM -> NEED TO RUN ONLY AFTER FIRST RUN OF SCRIPT CUZ IT WILL RUN EVERYTIME AFTER UPDATE OF ANY VARIABLE IN SCRIPT
  // if(firstTeamPick !== null)
  // {
  //   if(draftPicks.length === 0)
  //   {
  //     setDraftPage(0);
  //     return(
  //       <div>
  //         <NavButtons/>
  //         <ChampPickComponent/>
  //       </div>
  //     )
  //   }
  //   else
  //   {
  //     if(draftPicks.length === 10)
  //     {
  //       setDraftPage(10);
  //       return(
  //         <div>
  //           <NavButtons/>
  //           <ChampPickComponent/>
  //         </div>
  //       )
  //     }
  //     else
  //     {
  //       setDraftPage(playersWithoutPick[0].page);
  //       return(
  //         <div>
  //           <NavButtons/>
  //           <ChampPickComponent/>
  //         </div>
  //       )
  //     }
  //   }
  // }
  // else
  // {
  //   return(
  //     <div>
  //       <NavButtons/>
  //       <RadioButton/>
  //     </div>
  //   )
  // }


  if(firstTeamPick !== null)
  {
    return(
      <div>
        <NavButtons/>
        <ChampPickComponent/>
      </div>
    )
  }
  else
  {
    return(
      <div>
        <NavButtons/>
        <RadioButton/>
      </div>
    )
  }



  // return (
  //   <div>
  //     <NavButtons />
  //     <ChampPickComponent />
  //   </div>
  // );
}

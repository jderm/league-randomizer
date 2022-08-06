import React, { useState } from "react";
import { useSelector } from "react-redux";
import { draftPick, selectList } from "./redux/listReducer";
import "./App.css";
import Page from "./pages/ChampListPage";
import DraftPickPage from "./pages/DraftPickPage";
import Settings from "./pages/SettingsPage";
import Randomize from "./pages/RandomizePage";
import { Button } from "@mui/material";

var availablePages = [0, 2, 6];
//0 = SETTINGS
//1 = ALLY TEAM BANS
//2 = ENEMY BANS
//3 = OPTIONAL BANS
//4 = CHAMP PICKS
//5 = RANDOMIZE
export default function App() {
  const list = useSelector(selectList);

  var [page, setPage] = useState(0);

  //MANAGING AVAILABLE PAGES AND THEIR ORDER
  //BAD I GUESS
  function changePagesOrder(type, val) {
    if (type === 0) {
      if(list.settings.optBans === true)
      {
        if(val === "true")
        {
          availablePages = availablePages.filter((item) => item !== 1);
        }
        else
        {
          availablePages.push(1);
          availablePages.sort();
        }
      }
      if (val === "true") {
        availablePages.push(3, 4, 5);
        availablePages = availablePages.filter((item) => item !== 2);
        availablePages.sort();
      } else if (val === "false") {
        var values = [3, 4, 5];
        availablePages = availablePages.filter(
          (item) => !values.includes(item)
        );
        availablePages.push(2);
        availablePages.sort();
      }
    } else if (type === 1) {
      if (val === "false") {
        availablePages.push(1);
        availablePages.sort();
      } else if (val === "true") {
        availablePages = availablePages.filter((item) => item !== 1);
      }
    }
    //console.log(availablePages);
  }

  //CHANGE PAGE FUNCTION
  function changePage(val) {
    var e = page + val;
    setPage(e);
  }


  switch (availablePages[page]) {
    //SETTINGS PAGE
    case 0:
      return (
        <div id="Page">
          {/* <ButtonNavigation fnc={changePage} page={availablePages[page]} /> */}
          <ButtonNavigation fnc={changePage} page={availablePages[page]} allyBan={list.draft.allyBans} enemyBan={list.draft.enemyBans} draftPick={list.draft.draftPicks}/>
          <div id="SettingsPage">
            <Settings changePagesOrder={changePagesOrder} />
          </div>
        </div>
      );

    //OPTIONAL BANS PAGE
    case 1:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="OptionalBans">
            <Page
              prev={list.banPhase1.concat(list.banPhase2)}
              current={list.banPhase3}
              numberOfBans={5}
              banArrayType="BAN_ARRAY_3"
              title="Optional bans:"
            />
          </div>
        </div>
      );

    //NORMAL PICK PAGE
    case 2:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            maxBans={list.settings.players.length}
            numberOfPickedCHamps={list.pickedChamps}
          />
          <div id="ChampPicks">
            <Page
              prev={list.banPhase1.concat(list.banPhase2, list.banPhase3)}
              current={list.pickedChamps}
              numberOfBans={list.settings.players.length}
              banArrayType="BAN_ARRAY_4"
              title="Player picks:"
            />
          </div>
        </div>
      );

    //ALLY BANS
    case 3:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} allyBan={list.draft.allyBans} enemyBan={list.draft.enemyBans} draftPick={list.draft.draftPicks}/>
          <div id="EnemyBans">
            <Page
              prev={list.banPhase1}
              current={list.banPhase2}
              numberOfBans={5}
              banArrayType="BAN_ARRAY_2"
              title="Enemy bans:"
            />
          </div>
        </div>
      );

    //ENEMY BANS
    case 4:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} allyBan={list.draft.allyBans} enemyBan={list.draft.enemyBans} draftPick={list.draft.draftPicks}/>
          <div id="EnemyBans">
            <Page
              prev={list.banPhase1}
              current={list.banPhase2}
              numberOfBans={5}
              banArrayType="BAN_ARRAY_2"
              title="Enemy bans:"
            />
          </div>
        </div>
      );

    //DRAFT PICK PAGE
    case 5:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} allyBan={list.draft.allyBans} enemyBan={list.draft.enemyBans} draftPick={list.draft.draftPicks}/>
          <div>
            <DraftPickPage
              prev={[]}
              arrayOfPicks={list.draftPicks}
              firstTeamPick={list.firstPickTeam}
            />
          </div>
        </div>
      );

    //ALLY TEAM BANS PAGE
    // case 1:
    //   return (
    //     <div id="Page">
    //       <ButtonNavigation fnc={changePage} page={availablePages[page]} />
    //       <div id="AllyBans">
    //         <Page
    //           prev={[]}
    //           current={list.banPhase1}
    //           numberOfBans={5}
    //           banArrayType="BAN_ARRAY_1"
    //           title="Your team bans:"
    //         />
    //       </div>
    //     </div>
    //   );

    //ENEMY TEAM BANS PAGE
    // case 2:
    //   return (
    //     <div id="Page">
    //       <ButtonNavigation fnc={changePage} page={availablePages[page]} />

    //       <div id="EnemyBans">
    //         <Page
    //           prev={list.banPhase1}
    //           current={list.banPhase2}
    //           numberOfBans={5}
    //           banArrayType="BAN_ARRAY_2"
    //           title="Enemy bans:"
    //         />
    //       </div>
    //     </div>
    //   );

    //RANDOMIZE PAGE
    case 6:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="Randomize">
            <Randomize />
          </div>
        </div>
      );

    //DEFAULT PAGE
    default:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <h3>Default page</h3>
        </div>
      );
  }
}

//NEED TO UPDATE NAV BUTTONS CODE AFTER ADDING DRAFT AND CLASH OPTION, MAYBE ADD IT INTO MAIN FUNCTION, MAYBE SHORTEN REDECLARING OF BUTTONS TO SHORTEN CODE
//NAVIGATION BUTTONS

//IF NORMAL
//NORMAL PICKS COUNT
//OPTIONAL BANS
//RANDOMIZER

//IF DRAFT
//ALLY BANS
//ENEMY BANS
//BOTH TEAM PICKS
//RANDOMIZER
const ButtonNavigation = ({
  fnc,
  page,
  maxBans,
  numberOfPickedCHamps,
  gameType,
  optBans,
  normPicks,
  allyBan,
  enemyBan,
}) => {
  // if(page === 0)
  // {

  // }
  //THIS IS WEIRD
  if (gameType === false) {
    if (optBans === true) {
      if (optBans === 10) {
        if (normPicks === 10) {
          <>
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </>;
        } else {
          <>
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </>;
        }
      } else {
        <NavButton fnc={fnc} val={-1} text={"back"} />;
      }
    } else {
      if (normPicks === 10) {
        <>
          <NavButton fnc={fnc} val={-1} text={"back"} />
          <NavButton fnc={fnc} val={+1} text={"next"} />
        </>;
      }
    }
  } else {
    if (allyBan.lenght === 5) {
      if (enemyBan.lenght === 5) {
        if (draftPick.length === 10) {
          <>
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </>;
        } else {
          <>
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </>;
        }
      } else {
        <>
          <NavButton fnc={fnc} val={-1} text={"back"} />
          <NavButton fnc={fnc} val={+1} text={"next"} />
        </>;
      }
    } else {
      <NavButton fnc={fnc} val={-1} text={"back"} />;
    }
  }
  // if (page === 0) {
  //   return (
  //     <div className="NavigationButtons">
  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: "#72737369", color: "#000" }}
  //         size="large"
  //         onClick={() => fnc(+1)}
  //       >
  //         next
  //       </Button>
  //     </div>
  //   );
  // } else if (page === 4) {
  //   if (maxBans - numberOfPickedCHamps.length !== 0) {
  //     return (
  //       <div className="NavigationButtons">
  //         <Button
  //           variant="contained"
  //           style={{ backgroundColor: "#72737369", color: "#000" }}
  //           size="large"
  //           onClick={() => fnc(-1)}
  //         >
  //           back
  //         </Button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="NavigationButtons">
  //         <Button
  //           variant="contained"
  //           style={{ backgroundColor: "#72737369", color: "#000" }}
  //           size="large"
  //           onClick={() => fnc(+1)}
  //         >
  //           next
  //         </Button>
  //         <Button
  //           variant="contained"
  //           style={{ backgroundColor: "#72737369", color: "#000" }}
  //           size="large"
  //           onClick={() => fnc(-1)}
  //         >
  //           back
  //         </Button>
  //       </div>
  //     );
  //   }
  // } else if (page === 5) {
  //   return (
  //     <div className="NavigationButtons">
  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: "#72737369", color: "#000" }}
  //         size="large"
  //         onClick={() => fnc(-1)}
  //       >
  //         back
  //       </Button>
  //     </div>
  //   );
  // } else if (page > 0) {
  //   return (
  //     <div className="NavigationButtons">
  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: "#72737369", color: "#000" }}
  //         size="large"
  //         onClick={() => fnc(+1)}
  //       >
  //         next
  //       </Button>
  //       <Button
  //         variant="contained"
  //         style={{ backgroundColor: "#72737369", color: "#000" }}
  //         size="large"
  //         onClick={() => fnc(-1)}
  //       >
  //         back
  //       </Button>
  //     </div>
  //   );
  // }
};

const NavButton = ({ fnc, val, text }) => {
  <Button
    variant="contained"
    style={{ backgroundColor: "#72737369", color: "#000" }}
    size="large"
    onClick={() => fnc(val)}
  >
    {text}
  </Button>;
};

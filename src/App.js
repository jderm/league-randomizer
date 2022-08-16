import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectList } from "./redux/listReducer";
import "./App.css";
import Page from "./pages/ChampListPage";
import DraftPickPage from "./pages/DraftPickPage";
import Settings from "./pages/SettingsPage";
import Randomize from "./pages/RandomizePage";
import { Button } from "@mui/material";

var availablePages = [0, 2, 6];
//0 = SETTINGS
//1 = OPTIONAL BANS
//2 = NORMAL PICKS
//3 = ALLY BANS
//4 = ENEMY BANS
//5 = DRAFT PICK
//6 = RANDOMIZE
//DEFAULT = DEFAULT
export default function App() {
  const list = useSelector(selectList);
  var [page, setPage] = useState(0);

  //CHANGE ORDER OF PAGES
  function changePagesOrder(type, val) {
    if (type === 0) {
      if (list.settings.optBans === true) {
        if (val === "true") {
          availablePages = availablePages.filter((item) => item !== 1);
        } else {
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
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="SettingsPage">
            <Settings changePagesOrder={changePagesOrder} />
          </div>
        </div>
      );

    //OPTIONAL BANS PAGE
    case 1:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            optBans={list.normal.optBans.length}
          />
          <div id="OptionalBans">
            <Page
              prev={[]}
              current={list.normal.optBans}
              numberOfBans={5}
              banArrayType="NORMAL_OPTIONAL_BANS"
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
            normPicks={list.normal.normPicks.length}
            normNumOfPlayers={list.settings.players.length}
          />
          <div id="ChampPicks">
            <Page
              prev={list.normal.optBans}
              current={list.normal.normPicks}
              numberOfBans={list.settings.players.length}
              banArrayType="NORMAL_PICKS"
              title="Player picks:"
            />
          </div>
        </div>
      );

    //ALLY BANS
    case 3:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            allyBans={list.draft.allyBans.length}
          />
          <div id="EnemyBans">
            <Page
              prev={[]}
              current={list.draft.allyBans}
              numberOfBans={5}
              banArrayType="DRAFT_ALLY_BANS"
              title="Ally bans:"
            />
          </div>
        </div>
      );

    //ENEMY BANS
    case 4:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            enemyBans={list.draft.enemyBans.length}
          />
          <div id="EnemyBans">
            <Page
              prev={[]}
              current={list.draft.enemyBans}
              numberOfBans={5}
              banArrayType="DRAFT_ENEMY_BANS"
              title="Enemy bans:"
            />
          </div>
        </div>
      );

    //DRAFT PICK PAGE
    case 5:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            draftPicks={list.draft.draftPicks.length}
          />
          <div>
            <DraftPickPage />
          </div>
        </div>
      );

    //RANDOMIZE PAGE
    case 6:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} />
          <div id="Randomize">
            <Randomize />
          </div>
        </div>
      );

    //DEFAULT PAGE
    default:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} />
          <h3>Default page</h3>
        </div>
      );
  }
}

const ButtonNavigation = ({
  fnc,
  page,
  optBans,
  normNumOfPlayers,
  normPicks,
  allyBans,
  enemyBans,
  draftPicks,
}) => {
  switch (page) {
    case 0:
      return (
        <div className="NavigationButtons">
          <NavButton fnc={fnc} val={+1} text={"next"} />
        </div>
      );

    case 1:
      if (optBans === 5) {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </div>
        );
      } else {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
          </div>
        );
      }

    case 2:
      if (normPicks === normNumOfPlayers) {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </div>
        );
      } else {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
          </div>
        );
      }

    case 3:
      if (allyBans === 5) {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </div>
        );
      } else {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
          </div>
        );
      }

    case 4:
      if (enemyBans === 5) {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"next"} />
          </div>
        );
      } else {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
          </div>
        );
      }

    case 5:
      if (draftPicks === 10) {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
            <NavButton fnc={fnc} val={+1} text={"randomize"} />
          </div>
        );
      } else {
        return (
          <div className="NavigationButtons">
            <NavButton fnc={fnc} val={-1} text={"back"} />
          </div>
        );
      }

    case 6:
      return (
        <div className="NavigationButtons">
          <NavButton fnc={fnc} val={-1} text={"back"} />
        </div>
      );

    default:
      return (
        <div className="NavigationButtons">
          <NavButton fnc={fnc} val={-1} text={"back"} />
        </div>
      );
  }
};

const NavButton = ({ fnc, val, text }) => {
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "#72737369", color: "#000" }}
      size="large"
      onClick={() => fnc(val)}
    >
      {text}
    </Button>
  );
};

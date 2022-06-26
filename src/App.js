import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectList } from "./redux/listReducer";
import "./App.css";
import Page from "./pages/ChampListPage";
import Settings from "./pages/SettingsPage";
import Randomize from "./pages/RandomizePage";
import { TextField, Button, Checkbox, Input } from "@mui/material";

var availablePages = [0, 4, 5];

export default function App() {
  const list = useSelector(selectList);

  var [page, setPage] = useState(0);

  //MANAGING AVAILABLE PAGES AND THEIR ORDER
  function changePagesOrder(type, val) {
    if (type === 0) {
      if (val === "true") {
        availablePages.push(1, 2);
        availablePages.sort();
      } else if (val === "false") {
        var values = [1, 2];
        availablePages = availablePages.filter(
          (item) => !values.includes(item)
        );
      }
    } else if (type === 1) {
      if (val === "false") {
        availablePages.push(3);
        availablePages.sort();
      } else if (val === "true") {
        availablePages = availablePages.filter((item) => item !== 3);
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
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="SettingsPage">
            <Settings changePagesOrder={changePagesOrder} />
          </div>
        </div>
      );

    //ALLY TEAM BANS PAGE
    case 1:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="AllyBans">
            {/* <h3>Your team bans:</h3> */}
            <Page
              prev={[]}
              current={list.banPhase1}
              numberOfBans={5}
              banArrayType="BAN_ARRAY_1"
              title="Your team bans:"
            />
          </div>
        </div>
      );

    //ENEMY TEAM BANS PAGE
    case 2:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />

          <div id="EnemyBans">
            {/* <h3>Enemy bans:</h3> */}
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

    //OPTIONAL BANS PAGE
    case 3:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <div id="OptionalBans">
            {/* <h3>Optional bans:</h3> */}
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

    //PICKING CHAMPIONS PAGE
    case 4:
      return (
        <div id="Page">
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            maxBans={list.settings.players.length}
            numberOfPickedCHamps={list.pickedChamps}
          />
          <div id="ChampPicks">
            {/* <h3>Player picks:</h3> */}
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

    //RANDOMIZE PAGE
    case 5:
      return (
        <div id="Page">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          {/* <table> */}
          <div id="Randomize">
            <Randomize />
            {/* </table> */}
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

//NAVIGATION BUTTONS
const ButtonNavigation = ({ fnc, page, maxBans, numberOfPickedCHamps }) => {
  if (page === 0) {
    return (
      <div className="NavigationButtons">
        <Button
          variant="contained"
          style={{ "backgroundColor": "#72737369", color: "#000" }}
          size="large"
          onClick={() => fnc(+1)}
        >
          next
        </Button>
      </div>
    );
  } else if (page === 4) {
    if (maxBans - numberOfPickedCHamps.length !== 0) {
      //console.log(maxBans - numberOfPickedCHamps.length);
      return (
        <div className="NavigationButtons">
          <Button
            variant="contained"
            style={{ "backgroundColor": "#72737369", color: "#000" }}
            size="large"
            onClick={() => fnc(-1)}
          >
            back
          </Button>
        </div>
      );
    } else {
      return (
        <div className="NavigationButtons">
          <Button
            variant="contained"
            style={{ "backgroundColor": "#72737369", color: "#000" }}
            size="large"
            onClick={() => fnc(+1)}
          >
            next
          </Button>
          <Button
            variant="contained"
            style={{ "backgroundColor": "#72737369", color: "#000" }}
            size="large"
            onClick={() => fnc(-1)}
          >
            back
          </Button>
        </div>
      );
    }
  } else if (page === 5) {
    return (
      <div className="NavigationButtons">
        <Button
          variant="contained"
          style={{ "backgroundColor": "#72737369", color: "#000" }}
          size="large"
          onClick={() => fnc(-1)}
        >
          back
        </Button>
      </div>
    );
  } else if (page > 0) {
    return (
      <div className="NavigationButtons">
        <Button
          variant="contained"
          style={{ "backgroundColor": "#72737369", color: "#000" }}
          size="large"
          onClick={() => fnc(+1)}
        >
          next
        </Button>
        <Button
          variant="contained"
          style={{ "backgroundColor": "#72737369", color: "#000" }}
          size="large"
          onClick={() => fnc(-1)}
        >
          back
        </Button>
      </div>
    );
  }
};

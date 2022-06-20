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
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <Settings changePagesOrder={changePagesOrder} />
        </div>
      );

    //ALLY TEAM BANS PAGE
    case 1:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <h3>Your team bans:</h3>
          <Page
            prev={[]}
            current={list.banPhase1}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_1"
          />
        </div>
      );

    //ENEMY TEAM BANS PAGE
    case 2:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <h3>Enemy bans:</h3>
          <Page
            prev={list.banPhase1}
            current={list.banPhase2}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_2"
          />
        </div>
      );

    //OPTIONAL BANS PAGE
    case 3:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <h3>Optional bans:</h3>
          <Page
            prev={list.banPhase1.concat(list.banPhase2)}
            current={list.banPhase3}
            numberOfBans={5}
            banArrayType="BAN_ARRAY_3"
          />
        </div>
      );

    //PICKING CHAMPIONS PAGE
    case 4:
      return (
        <div>
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            maxBans={list.settings.players.length}
            numberOfPickedCHamps={list.pickedChamps}
          />
          <h3 className="center">Player picks:</h3>
          <Page
            prev={list.banPhase1.concat(list.banPhase2, list.banPhase3)}
            current={list.pickedChamps}
            numberOfBans={list.settings.players.length}
            banArrayType="BAN_ARRAY_4"
          />
        </div>
      );

    //RANDOMIZE PAGE
    case 5:
      return (
        <div className="center">
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <table>
            <Randomize />
          </table>
        </div>
      );

    //DEFAULT PAGE
    default:
      return (
        <div className="center">
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
      <div className="buttonsCenter">
        <Button variant="contained" onClick={() => fnc(+1)}>next</Button>
      </div>
    );
  } else if (page === 4) {
    if (maxBans - numberOfPickedCHamps.length !== 0) {
      console.log(maxBans - numberOfPickedCHamps.length);
      return (
        <div className="buttonsCenter">
          <Button variant="contained" onClick={() => fnc(-1)}>back</Button>
        </div>
      );
    } else {
      return (
        <div className="buttonsCenter">
          <Button variant="contained" onClick={() => fnc(+1)}>next</Button>
          <Button variant="contained" onClick={() => fnc(-1)}>back</Button>
        </div>
      );
    }
  } else if (page === 5) {
    return (
      <div className="buttonsCenter">
        <Button variant="contained" onClick={() => fnc(-1)}>back</Button>
      </div>
    );
  } else if (page > 0) {
    return (
      <div className="buttonsCenter">
        <Button variant="contained" onClick={() => fnc(+1)}>next</Button>
        <Button variant="contained" onClick={() => fnc(-1)}>back</Button>
      </div>
    );
  }
};

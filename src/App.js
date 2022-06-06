import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectList } from "./redux/listReducer";
import "./App.css";
import Page from "./pages/ChampListPage";
import Settings from "./pages/SettingsPage";
import Randomize from "./pages/RandomizePage";

var availablePages = [0, 4, 5];

export default function App() {
  const list = useSelector(selectList);

  var [page, setPage] = useState(0);

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

  function changePage(val) {
    var e = page + val;
    setPage(e);
  }

  switch (availablePages[page]) {
    case 0:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <Settings changePagesOrder={changePagesOrder} />
        </div>
      );

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

    case 4:
      return (
        <div>
          <ButtonNavigation
            fnc={changePage}
            page={availablePages[page]}
            maxBans={list.settings.players.length}
            numberOfPickedCHamps={list.pickedChamps}
          />
          <h3>Player picks:</h3>
          <Page
            prev={list.banPhase1.concat(list.banPhase2, list.banPhase3)}
            current={list.pickedChamps}
            numberOfBans={list.settings.players.length}
            banArrayType="BAN_ARRAY_4"
          />
        </div>
      );

    case 5:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <table>
            <Randomize />
          </table>
        </div>
      );

    default:
      return (
        <div>
          <ButtonNavigation fnc={changePage} page={availablePages[page]} />
          <h3>Default page</h3>
        </div>
      );
  }
}

const ButtonNavigation = ({ fnc, page, maxBans, numberOfPickedCHamps }) => {
  if (page === 0) {
    return (
      <div>
        <button onClick={() => fnc(+1)}>next</button>
      </div>
    );
  } else if (page === 4) {
    if (maxBans - numberOfPickedCHamps.length !== 0) {
      console.log(maxBans - numberOfPickedCHamps.length);
      return (
        <div>
          <button onClick={() => fnc(-1)}>back</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => fnc(+1)}>next</button>
          <button onClick={() => fnc(-1)}>back</button>
        </div>
      );
    }
  } else if (page === 5) {
    return (
      <div>
        <button onClick={() => fnc(-1)}>back</button>
      </div>
    );
  } else if (page > 0) {
    return (
      <div>
        <button onClick={() => fnc(+1)}>next</button>
        <button onClick={() => fnc(-1)}>back</button>
      </div>
    );
  }
};

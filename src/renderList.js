import React from "react";
import champ from "./champions.json";
import { useState } from "react";
import './App.css';

const Item = ({ pos, id, name, icon, onRemove }) => {
    var inpId = "champ" + id;
    var iconPath = "/"+icon;
  return (
    <div>
      <h5>Position in list: {pos}</h5>
      <h5>Position in json: {id}</h5>
      <h5>Name: {name}</h5>
      <h5>Icon path: {icon}</h5>
      <input type="checkbox" id={inpId} />
      <label for={inpId}>
        <img src={iconPath} />
      </label>
      {/* <button id={id} onClick={() => onRemove(id)}>
        Delete {name}
      </button> */}
      <br />
      <br />
    </div>
  );
};

const List = ({ list, onRemove }) => (
  <div>
    {list.map((item) => (
      <Item
        pos={list.indexOf(item)}
        id={item.id}
        name={item.name}
        icon={item.icon}
        onRemove={onRemove}
      />
    ))}
  </div>
);

export default function App() {
  const [list, setList] = useState(champ);

  function remove(pos) {
    const arr = list.filter((item) => item.id !== pos);
    setList(arr);
  }
  return <List list={list} onRemove={remove} />;
}

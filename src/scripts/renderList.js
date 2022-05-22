import React from "react";
import champ from "../champions.json";
import checks from "../checkboxFile.json";
import { useState } from "react";
import "../App.css";

export default function App() {
  const [list, setList] = useState(champ);
  const [searchTerm, setSearchTerm] = useState("");
  const [checked, setChecked] = useState(checks);

  function remove(pos) {
    const arr = list.filter((item) => item.id !== pos);
    setList(arr);
  }

  function change(pos) {
    var idk = checked;
    idk[pos].check = !idk[pos].check;
    setChecked([...idk]);
  }

  return (
    <div className="idk">
      <input
        id="filter"
        name="filter"
        type="text"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <div className="champSearch">
        {list
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => (
            <Item
              pos={list.indexOf(item)}
              id={item.id}
              name={item.name}
              icon={item.icon}
              onRemove={remove}
              checked={checked[item.id].check}
              change={change}
            />
          ))}
      </div>
    </div>
  );
}

const Item = ({ pos, id, name, icon, onRemove, checked, change }) => {
  var inpId = "champ" + id;
  //console.log(inpId+" is "+checked);
  return (
    <div className="champ" id={name}>
      <h5>Position in list: {pos}</h5>
      <h5>Position in json: {id}</h5>
      <h5>Name: {name}</h5>
      <h5>Icon path: {icon}</h5>

      <input type="checkbox" id={id} labelid={inpId} checked={checked} />
      <label for={inpId} onClick={() => change(id)}>
        <img src={icon} />
      </label>
      {/* <button id={id} onClick={() => onRemove(id)}>
        Delete {name}
      </button> */}
      {/* <br />
      <br /> */}
    </div>
  );
};

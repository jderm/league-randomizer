import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ban,
} from "../redux/listReducer";
import champ from "../champions.json";

export default function Page({
  prev,
  current,
  banArrayType,
  numberOfBans,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <h4>Selected champions:</h4>
      <ol>
        {current.map((item) => (
          <li>
            Item ID: {item.id}, Item name: {item.name}
          </li>
        ))}
      </ol>
      <h4>Picks/bans remaining: ({numberOfBans - current.length})</h4>

      <input
        id="filter"
        name="filter"
        type="text"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {champ
        .filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (
            val.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        })
        .filter((val) => prev.every((e) => e.id !== val.id))
        .map((item) => (
          <div>
            <Item
              pos={champ.indexOf(item)}
              id={item.id}
              name={item.name}
              icon={item.icon}
              checked={current.some((e) => e.id === item.id)}
              change={() =>
                dispatch(
                  ban({ id: item.id, name: item.name, type: banArrayType })
                )
              }
            />
          </div>
        ))}
    </div>
  );
}


const Item = ({ pos, id, name, icon, checked, change }) => {
  //var inpId = "champ" + id;

  return (
    <div className="champ" id={name}>
      <h5>Position in list: {pos}</h5>
      <h5>Position in json: {id}</h5>
      <h5>Name: {name}</h5>
      {/* <h5>Icon path: {icon}</h5> */}

      <input
        type="checkbox"
        id={id}
        labelid={"champ" + id}
        checked={checked}
        onChange={() => change(id)}
      />
      <label for={"champ" + id} onClick={() => change(id)}>
        <img src={icon} alt={name} />
      </label>
    </div>
  );
};

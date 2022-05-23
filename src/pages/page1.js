import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  deleteRandom,
  changeNumOfPlayers,
  selectList,
  ban,
} from "../redux/listReducer";
import champ from "../champions.json";

export default function Page({ changePage, current, prev, banArrayType }) {
  //const list = useSelector(selectList);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      {/* <button onClick={() => changePage(-1)}>back</button>
      <button onClick={() => changePage(+1)}>next</button> */}
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
              //checked={list.champs[item.id].banned}
              checked={current.some((e) => e.id === item.id)}
              change={() => dispatch(ban({id:item.id, name:item.name, type:banArrayType}))}
            />
          </div>
        ))}
    </div>
  );
}

const Item = ({ pos, id, name, icon, checked, change }) => {
  var inpId = "champ" + id;

  return (
    <div className="champ" id={name}>
      <h5>Position in list: {pos}</h5>
      <h5>Position in json: {id}</h5>
      <h5>Name: {name}</h5>
      {/* <h5>Icon path: {icon}</h5> */}

      <input
        type="checkbox"
        id={id}
        labelid={inpId}
        checked={checked}
        onChange={() => change(id)}
      />
      <label for={inpId} onClick={() => change(id)}>
        <img src={icon} />
      </label>
    </div>
  );
};

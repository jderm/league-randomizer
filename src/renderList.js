import React from "react";
import champ from "./champions.json";
import { useState } from "react";
import './App.css';


export default function App() {
  const [list, setList] = useState(champ);
  const [textarea, setTextarea] = useState("");
  
  function remove(pos) {
    const arr = list.filter((item) => item.id !== pos);
    setList(arr);
  }
  
  return <List list={list} onRemove={remove} />;
}



const Item = ({ pos, id, name, icon, onRemove }) => {
    var inpId = "champ" + id;
    var iconPath = "/"+icon;
  return (
    
    <div className="champ" id={name}>
      {/* <h5>Position in list: {pos}</h5>
      <h5>Position in json: {id}</h5>
      <h5>Name: {name}</h5>
      <h5>Icon path: {icon}</h5> */}
      <input type="checkbox" id={inpId} />
      <label for={inpId}>
        <img src={iconPath} />
      </label>
      {/* <button id={id} onClick={() => onRemove(id)}>
        Delete {name}
      </button> */}
      {/* <br />
      <br /> */}
    </div>
  );
};



const List = ({ list, onRemove }) => (
  <div className="list">
    <input type="text" id="myInput" value={textarea} onChange={myFunction()} placeholder="Search for names.." title="Type in a name"></input>

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



function myFunction() {
  console.log("idk");
  var input, filter, ul, li, a, i, txtValue;
  // input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  // ul = document.getElementsByClassName("list");
  // li = ul.getElementsByClassName("champ");
//   if(input != "")
//   {
//   for (i = 0; i < li.length; i++) {
//       a = li[i].getElementById();
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           li[i].style.display = "";
//       } else {
//           li[i].style.display = "none";
//       }
//   }
// }
}



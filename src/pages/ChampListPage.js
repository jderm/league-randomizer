import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ban } from "../redux/listReducer";
import champ from "../champions.json";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import "../Style.css";
import "../App.css";

import {
  TextField,
  Button,
  Checkbox,
  Input,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

export default function Page({ prev, current, banArrayType, numberOfBans, title }) {
  //const list = useSelector(selectList);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  //
  //as first filter champ list of banned champs and then work w item
  //just temporary (need to edit for actuall list of bans)
  //

  //console.log(prev);
  //console.log("Current ban array:"+current);
  //CHAMP LIST FILTERED OF BANNED CHAMPS
  
  var banFilteredChampArr = champ.filter((val) =>
    prev.every((e) => e.id !== val.id)
  );
  //console.log(champ);
  //console.log(banFilteredChampArr);
  const ITEM_SIZE = 150;

  // const cache=React.useRef(
  //   new CellMeasurerCache({

  //     fixedWidth:true,
  //     defaultHeight:200,
  //   })
  //   );
  //
  //then need to calc items count everytime user tries to filter champs using search
  //

  //CHAMP LIST FILTERED OF SEARCHBAR
  var searchFilteredChampArr = banFilteredChampArr.filter((val) => {
    if (searchTerm == "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  return (
    <div>
      <div className="CenterContent">
        <h3>{title}</h3>
        {/* <input
        id="filter"
        name="filter"
        type="text"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      /> */}
      <TextField
            id="filter"
            variant="filled"
            name="filter"
            
            value={searchTerm}
            fullWidth
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
      <h4>Selected champions:</h4>
      <ol>
        {current.map((item) => (
          <li key={item.id}>
            {/* Item ID: {item.id}, Item name: {item.name} */}
            {item.name}
          </li>
        ))}
      </ol>
      <h4>Picks/bans remaining: ({numberOfBans - current.length})</h4>
      </div>
      <div id="ChampionSelector" style={{"display": "flex", "justifyContent": "center"}}>
      <div style={{ width: "100%", height: "calc(100vh - (289px + 43px + 25px + 38px))", "maxWidth":"1500px" }}>
      <AutoSizer>
        {({ width, height }) => {
          //num of items per row depends on size of each items and window width
          const itemsPerRow = Math.floor(width / ITEM_SIZE);
          //count of rows depends on length of array and num of items per one row
          var rowCount = Math.ceil(searchFilteredChampArr.length / itemsPerRow);
          return (
            <List
              className="List"
              width={width}
              height={height}
              //render times depend on count of rows
              rowCount={rowCount}
              rowHeight={ITEM_SIZE}
              // deferredMeasurementCache={cache.current}
              //renders whole row of items
              rowRenderer={({ index, key, style, parent }) => {
                const items = [];
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(
                  fromIndex + itemsPerRow,
                  searchFilteredChampArr.length
                );
                //
                //fix asignin name and icon to each item
                //
                for (let i = fromIndex; i < toIndex; i++) {
                  items.push(
                    // <CellMeasurer
                    //   key={i}
                    //   cache={cache.current}
                    //   parent={parent}
                    //   columnIndex={0}
                    //   rowIndex={index}
                    // >
                      //RENDERING ITEM
                      <div className="Item" key={searchFilteredChampArr[i].id}>
                        <h4>{searchFilteredChampArr[i].name}</h4>
                        <input
                          type="checkbox"
                          id={i}
                          labelid={"Item" + searchFilteredChampArr[i].id}
                          checked={current.some(
                            (e) => e.id === searchFilteredChampArr[i].id
                          )}
                          onChange={() =>
                            dispatch(
                              ban({
                                id: searchFilteredChampArr[i].id,
                                name: searchFilteredChampArr[i].name,
                                type: banArrayType,
                              })
                            )
                          }
                        />
                        <label
                          htmlFor={"Item" + searchFilteredChampArr[i].id}
                          className="labelClass"
                          onClick={() =>
                            dispatch(
                              ban({
                                id: searchFilteredChampArr[i].id,
                                name: searchFilteredChampArr[i].name,
                                type: banArrayType,
                              })
                            )
                          }
                        >
                          <img 
                            src={searchFilteredChampArr[i].icon}
                            alt={searchFilteredChampArr[i].name}
                          />
                        </label>
                      </div>
                    // </CellMeasurer>
                  );
                }
                //RENDER WHOLE ROW
                return (
                  <div className="Row" key={key} style={style}>
                    {items}
                  </div>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </div>
    </div>
    </div>
  );
}

//
//OG code
// export default function Page({ prev, current, banArrayType, numberOfBans }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h4>Selected champions:</h4>
//       <ol>
//         {current.map((item) => (
//           <li>
//             Item ID: {item.id}, Item name: {item.name}
//           </li>
//         ))}
//       </ol>
//       <h4>Picks/bans remaining: ({numberOfBans - current.length})</h4>

//       <input
//         id="filter"
//         name="filter"
//         type="text"
//         value={searchTerm}
//         onChange={(event) => {
//           setSearchTerm(event.target.value);
//         }}
//       />
//       {champ
//         .filter((val) => {
//           if (searchTerm === "") {
//             return val;
//           } else if (
//             val.name.toLowerCase().includes(searchTerm.toLowerCase())
//           ) {
//             return val;
//           }
//         })
//         .filter((val) => prev.every((e) => e.id !== val.id))
//         .map((item) => (
//           <div>
//             <Item
//               pos={champ.indexOf(item)}
//               id={item.id}
//               name={item.name}
//               icon={item.icon}
//               checked={current.some((e) => e.id === item.id)}
//               change={() =>
//                 dispatch(
//                   ban({ id: item.id, name: item.name, type: banArrayType })
//                 )
//               }
//             />
//           </div>
//         ))}
//     </div>
//   );
// }

// const Item = ({ pos, id, name, icon, checked, change }) => {
//   return (
//     <div className="champ" id={name}>
//       <h5>Position in list: {pos}</h5>
//       <h5>Position in json: {id}</h5>
//       <h5>Name: {name}</h5>
//       <input
//         type="checkbox"
//         id={id}
//         labelid={"champ" + id}
//         checked={checked}
//         onChange={() => change(id)}
//       />
//       <label for={"champ" + id} onClick={() => change(id)}>
//         <img src={icon} alt={name} />
//       </label>
//     </div>
//   );
// };
//

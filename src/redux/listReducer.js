import { createSlice } from "@reduxjs/toolkit";
import champs from "./champs";

const initialState = {
  champs,
  idk: [{ id: "idk", name: "urmom" }],
  banPhase1: 
  [],
  banPhase2:
  [],
  banPhase3:
  [],
  pickedChamps:
  [],
  settings: {
    numOfPlayer: 1,
    normOrDraft: false,
    playes: [{ playerName: "", playerPick: null }],
  },
};
export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {

    //
    //
    // 
    //add reducer for setting w switch

    add: (state, { payload }) => {
      state.idk.push(payload);
    },

    deleteRandom: (state, action) => {
      const rand = Math.floor(Math.random() * action.payload);
      console.log(rand);
      //remove by index
      state.splice(rand, 1);
      //remove by id value
      //return state.filter((item) => item.id != rand);
    },

    changeNumOfPlayers: (state, { payload }) => {
      state.settings.numOfPlayer = payload;
      console.log(state.settings.numOfPlayer);
    },

    ban: (state, { payload }) => {
      // console.log(payload);
      // var resp = state.banPhase2.some((e) => e.id === payload.id);
      console.log("array contains "+resp);
      switch(payload.type)
      {
        case "BAN_ARRAY_1":
          var resp = state.banPhase1.some((e) => e.id === payload.id);
          if(resp)
          {
            const tempArr = state.banPhase1.filter((item) => item.id !== payload.id);
            state.banPhase1 = tempArr;
            console.log("removed "+ payload.id +" from "+ payload.type)
          }
          else
          {
            state.banPhase1.push({id:payload.id, name:payload.name});
            console.log("added "+ payload.id +" to "+ payload.type)
          }
          break;
        case "BAN_ARRAY_2":
          var resp = state.banPhase2.some((e) => e.id === payload.id);
          if(resp)
          {
            const tempArr = state.banPhase2.filter((item) => item.id !== payload.id);
            state.banPhase2 = tempArr;
            console.log("removed "+ payload.id +" from "+ payload.type)
          }
          else
          {
            state.banPhase2.push({id:payload.id, name:payload.name});
            console.log("added "+ payload.id +" to "+ payload.type)
          }
          break;
        case "BAN_ARRAY_3":
          var resp = state.banPhase3.some((e) => e.id === payload.id);
          if(resp)
          {
            const tempArr = state.banPhase3.filter((item) => item.id !== payload.id);
            state.banPhase3 = tempArr;
            console.log("removed "+ payload.id +" from "+ payload.type)
          }
          else
          {
            state.banPhase3.push({id:payload.id, name:payload.name});
            console.log("added "+ payload.id +" to "+ payload.type)
          }
          break;
      }
      //muda
      state.champs[payload.id].banned = !state.champs[payload.id].banned;
      console.log(state.champs[payload.id].banned);
      //
    },
  },
});

export const { add, deleteRandom, changeNumOfPlayers, ban } = listSlice.actions;

export const selectList = (state) => state.list;

export default listSlice.reducer;

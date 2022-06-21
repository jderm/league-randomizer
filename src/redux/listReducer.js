import { createSlice } from "@reduxjs/toolkit";

const defaultLaneNames = [
  { id: 0, name: "Top" },
  { id: 1, name: "Mid" },
  { id: 2, name: "Jungle" },
  { id: 3, name: "ADC" },
  { id: 4, name: "Support" },
];

const initialState = {
  banPhase1: [],
  banPhase2: [],
  banPhase3: [],
  pickedChamps: [],
  settings: {
    normOrDraft: false,
    players: [{ id: 0, name: "Player 1" }],
    availableLanes: defaultLaneNames,
    gameType: false,
    optBans: false,
  },
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    editSettings: (state, { payload }) => {
      switch (payload.type) {
        case "CHANGE_PLAYER_NAME":
          state.settings.players[payload.id].name = payload.name;
          break;

        case "CHANGE_LANE_NAME":
          state.settings.availableLanes[payload.id].name = payload.laneName;
          break;

        case "CHANGE_NUMBER_OF_PLAYERS":
          var playersArrayLenght = state.settings.players.length;
          var availableLanesLength = state.settings.availableLanes.length;
          var payloadLength = payload.count;
          if (playersArrayLenght < payloadLength) {
            if (availableLanesLength < payloadLength) {
              //adding lanes by input players
              for (
                availableLanesLength;
                availableLanesLength < payloadLength;
                availableLanesLength++
              ) {
                state.settings.availableLanes.push({
                  id: availableLanesLength,
                  name: defaultLaneNames[availableLanesLength].name,
                });
              }
            }
            //adding players by input players
            for (
              playersArrayLenght;
              playersArrayLenght < payloadLength;
              playersArrayLenght++
            ) {
              state.settings.players.push({
                id: playersArrayLenght,
                name: "Player " + (playersArrayLenght + 1),
              });
            }
          } else if (playersArrayLenght > payloadLength) {
            //var idLane = idLane;
            if (availableLanesLength < payloadLength) {
              //adding lanes by input players
              for (
                availableLanesLength;
                availableLanesLength < payloadLength;
                availableLanesLength++
              ) {
                state.settings.availableLanes.push({
                  id: availableLanesLength,
                  name: defaultLaneNames[availableLanesLength].name,
                });
              }
            }
            //removing players by input players
            var tmp = playersArrayLenght - payloadLength;
            state.settings.players.splice(payloadLength, tmp);

            //ADJUST TO NUM OF PICKED CHAMPS NOT BE HIGHET THAN NUM OF PLAYERS
            //(NEED TO TEST LATER)
            if(state.settings.players.length < state.pickedChamps.length)
            {
              var tmp = playersArrayLenght - payloadLength;
              state.pickedChamps.splice(payloadLength, tmp);
            }
          }
          break;

        case "CHANGE_NUMBER_OF_LANES":
          var playersArrayLenght = state.settings.players.length;
          var availableLanesLength = state.settings.availableLanes.length;
          var payloadLength = payload.count;

          if (availableLanesLength < payloadLength) {
            for (
              availableLanesLength;
              availableLanesLength < payloadLength;
              availableLanesLength++
            ) {
              state.settings.availableLanes.push({
                id: availableLanesLength,
                name: defaultLaneNames[availableLanesLength].name,
              });
            }
          } else if (availableLanesLength > payloadLength) {
            if (playersArrayLenght >= payloadLength) {
              var tmp = playersArrayLenght - payloadLength;
              state.settings.players.splice(payloadLength, tmp);
            }
            var tmp = availableLanesLength - payloadLength;
            state.settings.availableLanes.splice(payloadLength, tmp);
          }
          break;

        case "CHANGE_GAME_TYPE":
          if (payload.value === "true") {
            state.settings.gameType = true;
          } else if (payload.value === "false") {
            state.settings.gameType = false;
          }
          break;

        case "OPTIONAL_BANS":
          state.settings.optBans = !state.settings.optBans;
          break;
      }
    },

    ban: (state, { payload }) => {
      switch (payload.type) {
        //ALLY TEAM BANS
        case "BAN_ARRAY_1":
          var resp = state.banPhase1.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.banPhase1.filter(
              (item) => item.id !== payload.id
            );
            state.banPhase1 = tempArr;
          } else {
            if (state.banPhase1.length < 5) {
              state.banPhase1.push({ id: payload.id, name: payload.name });
            }
          }
          resp = state.banPhase2.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.banPhase2.filter(
              (item) => item.id !== payload.id
            );
            state.banPhase2 = tempArr;
          }
          break;
        //ENEMY TEAM BANS
        case "BAN_ARRAY_2":
          var resp = state.banPhase2.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.banPhase2.filter(
              (item) => item.id !== payload.id
            );
            state.banPhase2 = tempArr;
          } else {
            if (state.banPhase2.length < 5) {
              state.banPhase2.push({ id: payload.id, name: payload.name });
            }
          }
          resp = state.banPhase3.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.banPhase3.filter(
              (item) => item.id !== payload.id
            );
            state.banPhase3 = tempArr;
          }
          break;
        //OPTIONAL BANS
        case "BAN_ARRAY_3":
          var resp = state.banPhase3.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.banPhase3.filter(
              (item) => item.id !== payload.id
            );
            state.banPhase3 = tempArr;
          } else {
            if (state.banPhase3.length < 5) {
              state.banPhase3.push({ id: payload.id, name: payload.name });
            }
          }
          resp = state.pickedChamps.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.pickedChamps.filter(
              (item) => item.id !== payload.id
            );
            state.pickedChamps = tempArr;
          }
          break;
        //PLAYER PICKS
        case "BAN_ARRAY_4":
          var resp = state.pickedChamps.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.pickedChamps.filter(
              (item) => item.id !== payload.id
            );
            state.pickedChamps = tempArr;
          } else {
            if (state.pickedChamps.length < state.settings.players.length) {
              state.pickedChamps.push({ id: payload.id, name: payload.name });
            }
          }
          break;
      }
    },
  },
});

export const { add, deleteRandom, changeNumOfPlayers, ban, editSettings } =
  listSlice.actions;

export const selectList = (state) => state.list;

export default listSlice.reducer;

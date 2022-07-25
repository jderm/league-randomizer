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
    // normOrDraft: false,
    players: [{ id: 0, name: "Player 1" }],
    availableLanes: defaultLaneNames,
    gameType: false,
    optBans: false,
  },


  draftPicks: [],
  firstPickTeam: null
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

        //SOMEHOW FUCKED UP AND NEEDS TO FIX, ESPECIALLY DRAFT CHECK
        case "CHANGE_NUMBER_OF_PLAYERS":
          var playersArrayLenght = state.settings.players.length;
          var availableLanesLength = state.settings.availableLanes.length;
          var payloadLength = payload.count;
          if (playersArrayLenght < payloadLength && state.settings.gameType === false) {
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
            }
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
          } else if (playersArrayLenght > payloadLength && state.settings.gameType === false) {
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
            }
            var tmp = playersArrayLenght - payloadLength;
            state.settings.players.splice(payloadLength, tmp);
          }
          if (state.settings.players.length < state.pickedChamps.length) {
            var tmp = playersArrayLenght - payloadLength;
            state.pickedChamps.splice(payloadLength, tmp);
          }
          break;

        case "CHANGE_NUMBER_OF_LANES":
          var playersArrayLenght = state.settings.players.length;
          var availableLanesLength = state.settings.availableLanes.length;
          var payloadLength = payload.count;

          if (availableLanesLength < payloadLength && state.settings.gameType === false) {
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
          } else if (availableLanesLength > payloadLength && state.settings.gameType === false) {
            if (playersArrayLenght >= payloadLength) {
              var tmp = playersArrayLenght - payloadLength;
              state.settings.players.splice(payloadLength, tmp);
            }
            var tmp = availableLanesLength - payloadLength;
            state.settings.availableLanes.splice(payloadLength, tmp);
          }
          if (
            state.settings.availableLanes.length < state.pickedChamps.length
          ) {
            var tmp = playersArrayLenght - payloadLength;
            state.pickedChamps.splice(payloadLength, tmp);
          }
          break;

        case "CHANGE_GAME_TYPE":
          if (payload.value === "true") {
            state.settings.gameType = true;
            if(state.settings.players.length < 5)
            {
              var playersArrayLenght = state.settings.players.length;
              for (
                playersArrayLenght;
                playersArrayLenght < 5;
                playersArrayLenght++
              ) {
                state.settings.players.push({
                  id: playersArrayLenght,
                  name: "Player " + (playersArrayLenght + 1),
                });
              }
            }
          } else if (payload.value === "false") {
            state.settings.gameType = false;
          }
          break;

        case "OPTIONAL_BANS":
          state.settings.optBans = !state.settings.optBans;
          break;
      }
    },

    firstPick: (state, payload) => {
      state.firstPickTeam = payload.payload;
    },

    draftPick: (state, {payload}) => {
      var resp = state.draftPicks.some((e) => e.id === payload.id);
          if (resp) {
            const tempArr = state.draftPicks.filter(
              (item) => item.id !== payload.id
            );
            state.draftPicks = tempArr;
          } else {
              state.draftPicks.push({ pickPos: payload.pickPos, team: payload.team, id: payload.id, name: payload.name });
          }
          state.draftPicks.sort((a, b) => a.pickPos - b.pickPos);
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

export const { add, deleteRandom, changeNumOfPlayers, ban, draftPick, firstPick, editSettings } =
  listSlice.actions;

export const selectList = (state) => state.list;

export default listSlice.reducer;

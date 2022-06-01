import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from './counterReducer';
import listReducer from './listReducer';

export default configureStore({
  reducer: {
    //counter: counterReducer,
    list: listReducer,
  },
});

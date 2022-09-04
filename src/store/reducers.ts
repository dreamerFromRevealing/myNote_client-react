import {combineReducers} from "@reduxjs/toolkit";
import fileSlice from "./fileSlice/fileSlice";
import appSlice from "./appSlice/appSlice";

const rootReducer = combineReducers({
  file: fileSlice,
  app: appSlice,
});

export default rootReducer;
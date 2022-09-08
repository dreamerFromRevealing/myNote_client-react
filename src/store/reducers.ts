import {combineReducers} from "@reduxjs/toolkit";
import fileSlice from "./fileSlice/fileSlice";
import appSlice from "./appSlice/appSlice";
import modalSlice from "./modalSlice/modalSlice";

const rootReducer = combineReducers({
  modal: modalSlice,
  file: fileSlice,
  app: appSlice,
});

export default rootReducer;
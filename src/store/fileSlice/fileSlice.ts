import {createSlice} from "@reduxjs/toolkit";
import arrayToTree from "../../assets/customArrayToTree";

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    saveDocument: false,
    status: 'Ожидание...',
    tree: {},
  },
  reducers: {
    createFileTree: (state, action) => {
      // После полученное обновленного объекта папок объединяют с объектом документов
      const parseResult = action.payload.folders.concat(
        action.payload.documents,
        action.payload.todoBoxes,
        action.payload.todoBoards,
        action.payload.logbooks,
        action.payload.logbookFolders,
        action.payload.logs,
      )
      // И все полученное отдаем функции для преобразования в дерево
      // тут результат будет банально записыватсья в хранилище

      const tree = arrayToTree(parseResult, {parentProperty: 'parentFolderId._id', customID: '_id'});
      state.tree = {...state.tree, [action.payload.title]: tree}
    },
    switchSaveDocument: (state) => {
      state.saveDocument = !state.saveDocument;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
})

export default fileSlice.reducer;
export const { switchSaveDocument, setStatus, createFileTree} = fileSlice.actions;
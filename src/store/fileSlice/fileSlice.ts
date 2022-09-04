import {createSlice} from "@reduxjs/toolkit";
import arrayToTree from "array-to-tree";

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    saveDocument: false,
    status: 'Ожидание...',
    tree: [],
  },
  reducers: {
    createFileTree: (state, action) => {
      // Тут идет обработка папок, для определения есть ли у них родительская папка или дети
      const parseData = action.payload.folders.map((folders: any) => ({
        ...folders,
        parentFolderId: folders.parentFolderId ? folders.parentFolderId._id : null,
        children: folders.children ? folders.children : []
      }))
      // После полученное обновленного объекта папок объединяют с объектом документов
      const parseResult = parseData.concat(action.payload.documents)
      // И все полученное отдаем функции для преобразования в дерево
      // тут результат будет банально записыватсья в хранилище
      state.tree = arrayToTree(parseResult, {parentProperty: 'parentFolderId', customID: '_id'});
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
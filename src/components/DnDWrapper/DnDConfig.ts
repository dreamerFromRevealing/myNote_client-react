import {GET_TODO_COLLECTIONS, GET_TODO_TASKS} from "../../queries/queries";
import {MULTIPLE_DnD_UPDATE_TODO_COLLECTION} from "./Reducers/TODOCollectionReducer/mutation";

/**
 * Набор конфигурация для работы с Drag and Drop
 */
export default {
  todoCollections: {
    query: GET_TODO_COLLECTIONS,
    parentVariable: 'parentTodoBoardParentId',
    mutation: MULTIPLE_DnD_UPDATE_TODO_COLLECTION,
  },
  todoTasks: {
    query: GET_TODO_TASKS,
    parentVariable: 'parentTodoCollectionId',
    mutation: MULTIPLE_DnD_UPDATE_TODO_COLLECTION,
  }
}
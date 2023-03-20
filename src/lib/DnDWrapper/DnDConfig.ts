import {DocumentNode} from "graphql";
import {MULTIPLE_DnD_UPDATE_TODO_COLLECTION, MULTIPLE_DnD_UPDATE_TODO_TASK} from "./mutations";
import {GET_TODO_COLLECTIONS} from "../../queries/entitis/TodoCollection";
import {GET_TODO_TASKS} from "../../queries/entitis/TodoTask";

export type DnDConfigItemType = {
  query: DocumentNode,
  mutation: DocumentNode,
  parentVariable: string
}

export type DnDConfigType = {
  [key: string]: DnDConfigItemType
}

/**
 * Набор конфигурация для работы с Drag and Drop
 */
export const DnDConfig: DnDConfigType = {
  TodoCollections: {
    query: GET_TODO_COLLECTIONS,
    parentVariable: 'parentTodoBoardParentId',
    mutation: MULTIPLE_DnD_UPDATE_TODO_COLLECTION,
  },
  TodoTasks: {
    query: GET_TODO_TASKS,
    parentVariable: 'parentTodoCollectionId',
    mutation: MULTIPLE_DnD_UPDATE_TODO_TASK,
  }
}
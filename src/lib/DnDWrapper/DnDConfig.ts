import {DocumentNode} from "graphql";
import {GET_TODO_COLLECTIONS, GET_TODO_TASKS} from "../../queries/queries";
import { MULTIPLE_DnD_UPDATE_TODO_COLLECTION } from "./mutations";

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
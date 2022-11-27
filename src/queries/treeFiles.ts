import {gql} from "@apollo/client";

export const UPDATE_DOCUMENT_TITLE = gql`
    mutation UpdateDocument ($_id: String!, $title: String){
        updateDocument (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`

export const CREATE_NEW_DOCUMENT = gql`
    mutation CreateDocument ($parentFolderId: String, $title: String!, $parentWorkspaceId: String!){
        createDocument (payload: {parentFolderId: $parentFolderId, title: $title, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const CREATE_NEW_FOLDER = gql`
    mutation createFolder ($parentFolderId: String, $title: String!, $parentWorkspaceId: String!){
        createFolder (payload: {parentFolderId: $parentFolderId, title: $title, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const DELETE_DOCUMENT = gql`
    mutation DeleteDocument ($_id: String!){
        deleteDocument (_id: $_id) {
            _id
        }
    }
`

export const DELETE_FOLDER = gql`
    mutation DeleteFolder ($_id: String!){
        deleteFolder (_id: $_id) {
            _id
        }
    }
`

export const CREATE_TODO_BOX = gql`
    mutation CreateTodoBox($title: String!, $parentFolderId: String, $parentWorkspaceId: String!) {
        createTodoBox(payload: {title: $title, parentFolderId: $parentFolderId, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const DELETE_TODO_BOX = gql`
    mutation DeleteTodoBox($_id: String!) {
        deleteTodoBox(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_TODO_BOX = gql`
    mutation UpdateTodoBox($_id: String!, $title: String, $parentWorkspaceId: String, $parentFolderId: String, $childTodoBoardIds: String) {
        updateTodoBox(payload: {_id: $_id, title: $title, parentWorkspaceId: $parentWorkspaceId, parentFolderId: $parentFolderId, childTodoBoardIds: $childTodoBoardIds}) {
            _id
        }
    }
`

export const CREATE_TODO_BOARD = gql`
    mutation CreateTodoBoard($title: String!, $parentTodoBoxId: String!) {
        createTodoBoard(payload: {title: $title, parentTodoBoxId: $parentTodoBoxId}) {
            _id
            title
        }
    }
`

export const DELETE_TODO_COLLECTION = gql`
    mutation DeleteTodoCollection($_id: String!) {
        deleteTodoCollection(_id: $_id) {
            _id
        }
    }
`

export const CREATE_TODO_COLLECTION = gql`
    mutation CreateTodoCollection ($title: String!, $color: String, $parentTodoBoardParentId: String!, $position: Float!) {
        createTodoCollection (payload: {title: $title, color: $color, parentTodoBoardParentId: $parentTodoBoardParentId, position: $position}) {
            _id
        }
    }
`

export const UPDATE_TODO_COLLECTION = gql`
    mutation UpdateTodoCollection($_id: String!, $title: String, $color: String, $parentTodoBoardParentId: String, $position: Float) {
        updateTodoCollection(payload: {_id: $_id, title: $title, color: $color, parentTodoBoardParentId: $parentTodoBoardParentId, position: $position}) {
            _id
        }
    }
`

export const CREATE_TODO_TASK = gql`
    mutation CreateTodoTask ($parentTodoCollectionId: String!, $title: String!, $description: String) {
        createTodoTask(payload: {parentTodoCollectionId: $parentTodoCollectionId, title: $title, description: $description}) {
            _id
        }
    }
`

export const UPDATE_TODO_TASK = gql`
    mutation UpdateTodoTask($_id: String!, $title: String, $description: String, $parentTodoCollectionId: String) {
        updateTodoTask(payload: {_id: $_id, title: $title, description: $description, parentTodoCollectionId: $parentTodoCollectionId}) {
            _id
        }
    }
`

export const DELETE_TODO_TASK = gql`
    mutation DeleteTodoTask($_id: String!) {
        deleteTodoTask(_id: $_id) {
            _id
        }
    }
`
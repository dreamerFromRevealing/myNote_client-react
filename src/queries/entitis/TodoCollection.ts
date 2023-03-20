import {gql} from "@apollo/client";

export const DELETE_TODO_COLLECTION = gql`
    mutation DeleteTodoCollection($_id: String!) {
        deleteTodoCollection(_id: $_id) {
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

export const CREATE_TODO_COLLECTION = gql`
    mutation CreateTodoCollection ($title: String!, $color: String, $parentTodoBoardParentId: String!, $position: Float!) {
        createTodoCollection (payload: {title: $title, color: $color, parentTodoBoardParentId: $parentTodoBoardParentId, position: $position}) {
            _id
        }
    }
`

export const GET_TODO_COLLECTIONS = gql`
    query TodoCollections($parentTodoBoardParentId: String) {
        todoCollections(filters: {parentTodoBoardParentId: $parentTodoBoardParentId}){
            _id
            title
            color
            position
            childrenTodoTaskIds {
                _id
            }
        }
    }
`

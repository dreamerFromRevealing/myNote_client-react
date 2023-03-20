import {gql} from "@apollo/client";

export const CREATE_TODO_BOX = gql`
    mutation CreateTodoBox($title: String!, $parentFolderId: String, $parentProjectId: String!) {
        createTodoBox(payload: {title: $title, parentFolderId: $parentFolderId, parentProjectId: $parentProjectId}) {
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
    mutation UpdateTodoBox($_id: String!, $title: String, $parentProjectId: String, $parentProjectId: String, $childTodoBoardIds: String) {
        updateTodoBox(payload: {_id: $_id, title: $title, parentProjectId: $parentProjectId, parentProjectId: $parentProjectId, childTodoBoardIds: $childTodoBoardIds}) {
            _id
        }
    }
`

export const GET_TODO_BOX = gql`
    query TodoBox ($_id: String!){
        todoBox (_id: $_id) {
            _id
            title
            parentProjectId {
                _id
            }
            parentProjectId {
                _id
            }
            childTodoBoardIds {
                _id
            }
        }
    }
`
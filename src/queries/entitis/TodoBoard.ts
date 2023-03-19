import {gql} from "@apollo/client";

export const DELETE_TODO_BOARD = gql`
    mutation DeleteTodoBoard($_id: String!) {
        deleteTodoBoard(_id: $_id) {
            _id
        }
    }
`

export const CREATE_TODO_BOARD = gql`
    mutation CreateTodoBoard($title: String!, $parentTodoBoxId: String!, $parentProjectId: String!) {
        createTodoBoard(payload: {title: $title, parentTodoBoxId: $parentTodoBoxId, parentProjectId: $parentProjectId}) {
            _id
            title
        }
    }
`
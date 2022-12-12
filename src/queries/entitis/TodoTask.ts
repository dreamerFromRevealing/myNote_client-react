import {gql} from "@apollo/client";

export const CREATE_TODO_TASK = gql`
    mutation CreateTodoTask ($parentTodoCollectionId: String!, $title: String!, $description: String, $position: Float!) {
        createTodoTask(payload: {parentTodoCollectionId: $parentTodoCollectionId, title: $title, description: $description, position: $position}) {
            _id
        }
    }
`

export const UPDATE_TODO_TASK = gql`
    mutation UpdateTodoTask($_id: String!, $title: String, $description: String, $parentTodoCollectionId: String, $position: Float) {
        updateTodoTask(payload: {_id: $_id, title: $title, description: $description, parentTodoCollectionId: $parentTodoCollectionId, position: $position}) {
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

export const GET_TODO_TASKS = gql`
    query TodoTasks($parentTodoCollectionId: String) {
        todoTasks(filters: {parentTodoCollectionId: $parentTodoCollectionId}){
            _id
            title
            position
            description
        }
    }
`


export const GET_TODO_TASK = gql`
    query TodoTask ($_id: String!){
        todoTask (_id: $_id) {
            _id
            title
            position
            description
        }
    }
`
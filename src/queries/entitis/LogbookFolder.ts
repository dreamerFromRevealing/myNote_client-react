import {gql} from "@apollo/client";

export const CREATE_LOGBOOK_FOLDER = gql`
    mutation CreateLogbookFolder($title: String!, $parentLogbookId: String) {
        createLogbookFolder(payload: {title: $title, parentLogbookId: $parentLogbookId}) {
            _id
            title
        }
    }
`

export const DELETE_LOGBOOK_FOLDER = gql`
    mutation DeleteLogbookFolder($_id: String!) {
        deleteLogbookFolder(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_LOGBOOK_FOLDER = gql`
    mutation UpdateLogbookFolder($_id: String!, $title: String, $parentLogbookId: String) {
        updateLogbookFolder(payload: {_id: $_id, title: $title, parentLogbookId: $parentLogbookId}) {
            _id
        }
    }
`

export const GET_TODO_LOGBOOK_FOLDER_BY_TITLE = gql`
    query LogbookFolder($title: String, $parentLogbookId: String) {
        logbookFolder(filters: {title: $title, parentLogbookId: $parentLogbookId}){
            _id
            title
        }
    }
`

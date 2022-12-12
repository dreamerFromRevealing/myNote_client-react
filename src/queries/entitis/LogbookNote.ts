import {gql} from "@apollo/client";

export const CREATE_LOGBOOK_NOTE = gql`
    mutation CreateLogbookNote($title: String!, $parentLogbookFolderId: String) {
        createLogbookNote(payload: {title: $title, parentLogbookFolderId: $parentLogbookFolderId}) {
            _id
            title
        }
    }
`

export const DELETE_LOGBOOK_NOTE = gql`
    mutation DeleteLogbookNote($_id: String!) {
        deleteLogbookNote(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_LOGBOOK_NOTE = gql`
    mutation UpdateLogbookNote($_id: String!, $title: String, $parentLogbookFolderId: String) {
        updateLogbookNote(payload: {_id: $_id, title: $title, parentLogbookFolderId: $parentLogbookFolderId}) {
            _id
        }
    }
`
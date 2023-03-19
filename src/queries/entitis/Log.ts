import {gql} from "@apollo/client";

export const CREATE_LOG = gql`
    mutation CreateLogbookNote($title: String!, $parentLogbookFolderId: String!, $parentProjectId: String!) {
        createLog(payload: {title: $title, parentLogbookFolderId: $parentLogbookFolderId, parentProjectId: $parentProjectId}) {
            _id
            title
        }
    }
`

export const DELETE_LOG = gql`
    mutation DeleteLog($_id: String!) {
        deleteLog(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_LOG = gql`
    mutation UpdateLog($_id: String!, $title: String, $parentLogbookFolderId: String, $content: String ) {
        updateLog(payload: {_id: $_id, title: $title, parentLogbookFolderId: $parentLogbookFolderId, content: $content}) {
            _id
        }
    }
`

export const GET_LOG = gql`
query Log($_id: String!) {
    log(_id: $_id) {
        _id
        title
        content
    }
}
`
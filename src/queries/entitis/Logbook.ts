import {gql} from "@apollo/client";

export const CREATE_LOGBOOK = gql`
    mutation CreateLogbook($title: String!, $parentFolderId: String, $parentWorkspaceId: String!) {
        createLogbook(payload: {title: $title, parentFolderId: $parentFolderId, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const DELETE_LOGBOOK = gql`
    mutation DeleteLogbook($_id: String!) {
        deleteLogbook(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_LOGBOOK = gql`
    mutation UpdateLogbook($_id: String!, $title: String, $parentWorkspaceId: String, $parentFolderId: String) {
        updateLogbook(payload: {_id: $_id, title: $title, parentWorkspaceId: $parentWorkspaceId, parentFolderId: $parentFolderId}) {
            _id
        }
    }
`


export const GET_LOGBOOK = gql`
    query Logbook ($_id: String!){
        logbook (_id: $_id) {
            _id
            title
            parentWorkspaceId {
                _id
            }
            parentFolderId {
                _id
            }
        }
    }
`

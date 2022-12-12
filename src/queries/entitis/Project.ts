import {gql} from "@apollo/client";

export const CREATE_PROJECT = gql`
    mutation CreateProject($title: String!, $parentFolderId: String, $parentWorkspaceId: String!) {
        createProject(payload: {title: $title, parentFolderId: $parentFolderId, parentWorkspaceId: $parentWorkspaceId}) {
            _id
            title
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation DeleteProject($_id: String!) {
        deleteProject(_id: $_id) {
            _id
        }
    }
`

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($_id: String!, $title: String, $parentWorkspaceId: String, $parentFolderId: String) {
        updateProject(payload: {_id: $_id, title: $title, parentWorkspaceId: $parentWorkspaceId, parentFolderId: $parentFolderId}) {
            _id
        }
    }
`

export const GET_PROJECT = gql`
    query Project ($_id: String!){
        project (_id: $_id) {
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

import {gql} from "@apollo/client";

export const CREATE_NEW_FOLDER = gql`
    mutation createFolder ($parentFolderId: String, $title: String!, $parentProjectId: String!){
        createFolder (payload: {parentFolderId: $parentFolderId, title: $title, parentProjectId: $parentProjectId}) {
            _id
            title
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

export const GET_FOLDER = gql`
    query Folder ($_id: String!){
        folder (_id: $_id) {
            _id
            title
            pathname
            parentProjectId {
                _id
            }
        }
    }
`

export const UPDATE_FOLDER = gql`
    mutation UpdateFolder ($_id: String!, $title: String){
        updateFolder (payload: {_id: $_id, title: $title}) {
            _id
            title
        }
    }
`
